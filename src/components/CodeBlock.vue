<script setup lang="ts">
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import { computed, ref, unref } from 'vue';
import { useTheme } from 'vuetify';
import { useApi } from '../composables/api';
import { useClipboard } from '@vueuse/core';
import { oneDark } from '@codemirror/theme-one-dark';
import { toJson } from '../utils';
import BtnCopy from './BtnCopy.vue';

const HighLightJs = hljsVuePlugin.component;

const isDarkTheme = computed(() => useTheme().global.current.value.dark);
const theme = computed(() => (isDarkTheme ? oneDark : undefined));

const props = defineProps({
  code: String,
  schema: Object,
});

const { execAsyncScript } = useApi();

const isExpanded = props.schema !== undefined;

const getDefaultPayload = () => {
  if (!props.schema || !props.schema?.fields.length) return '';
  const fields = props.schema.fields;
  const defaults = Object.fromEntries(
    fields.map((x) => {
      if (!x.required) return [x.name, null];
      if (x.type.endsWith('[]')) return [x.name, []];
      return [x.name, ''];
    }),
  );
  return toJson(defaults);
};

const payload = ref(getDefaultPayload());
const response = ref(toJson());

const run = async () => {
  if (props.schema !== undefined && !Object.keys(payload.value ?? {}).length)
    return;
  const ctx = {};
  if (payload.value) ctx['payload'] = JSON.parse(unref(payload));
  try {
    const result = await execAsyncScript(`return ${props.code}`, ctx);
    response.value = toJson(result);
  } catch (ex) {
    response.value = toJson({ status: 'error', error: String(ex) });
  }
};

const { copy, copied } = useClipboard({ source: props.code });
</script>

<template>
  <v-theme-provider theme="dark">
    <v-sheet
      rounded
      border
      class="py-0 px-4"
      :color="isDarkTheme ? '#282c34' : '#282c34'"
    >
      <div class="d-flex justify-space-between align-center">
        <HighLightJs autodetect :code="code" />

        <div class="ml-4 d-flex align-center">
          <v-btn
            class="mr-3"
            :icon="
              !copied
                ? 'mdi-clipboard-multiple-outline'
                : 'mdi-clipboard-check-multiple-outline'
            "
            :color="copied ? 'success' : ''"
            size="small"
            @click="copy(code)"
          />
          <v-btn color="success" @click="run">
            <span class="mr-1">Run</span>
            <v-icon class="mdi mdi-play" size="small" />
          </v-btn>
        </div>
      </div>
      <v-divider />
      <div class="my-3 d-flex">
        <template v-if="isExpanded">
          <div style="width: 50%">
            <h1 class="text-subtitle-1 text-medium-emphasis">Payload:</h1>
            <codemirror
              v-model="payload"
              :indent-with-tab="false"
              :tab-size="2"
              style="max-height: 300px; height: min-content"
              :extensions="[json(), theme]"
            />
          </div>
          <div style="width: 0.75rem; height: 100%; background: #000" />
        </template>
        <div :style="{ width: isExpanded ? '50%' : '100%' }">
          <div class="d-flex align-center">
            <h1 class="text-subtitle-1 text-medium-emphasis">Response:</h1>
            <v-spacer />
            <BtnCopy v-show="response" :source="response" variant="plain" />
          </div>
          <codemirror
            v-model="response"
            placeholder="Response"
            :indent-with-tab="false"
            :tab-size="2"
            :disabled="true"
            style="max-height: 300px; height: min-content"
            :extensions="[json(), theme]"
          />
        </div>
      </div>
    </v-sheet>
  </v-theme-provider>
</template>
