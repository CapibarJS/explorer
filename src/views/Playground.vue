<template>
  <div>
    <h1 class="text-h4 pa-3">
      Capibar JS
      <span class="text-medium-emphasis">Playground</span>
    </h1>
  </div>

  <div class="d-flex h-100">
    <codemirror
      v-model="codeJS"
      placeholder="Code write here..."
      :style="{ height: '100%', width: '50%' }"
      :autofocus="true"
      :tab-size="2"
      :extensions="getExtensions(javascript)"
      @ready="handleReady"
    />
    <div
      class="position-relative d-flex align-center"
      style="width: 0.75rem; height: 100%; z-index: 2"
    >
      <div
        class="position-absolute"
        style="left: 50%; transform: translate(-50%, -50%)"
      >
        <v-btn icon width="60" height="60" elevation="10" @click="runScript">
          <v-icon class="mdi mdi-play" size="35" />
        </v-btn>
      </div>
    </div>
    <codemirror
      v-model="codeJSON"
      placeholder="Response..."
      :style="{ height: '100%', width: '50%' }"
      :indent-with-tab="false"
      :tab-size="2"
      :disabled="true"
      :extensions="getExtensions(json)"
    />
  </div>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from 'vue';
import { useTheme } from 'vuetify';
import { debounce, formatCodeJS, toJson } from '@/utils';
import { useApi } from '@/composables/api';
import { useStorage } from '@vueuse/core';

const isDarkTheme = computed(() => useTheme().global.current.value.dark);
const theme = computed(() => (isDarkTheme ? oneDark : undefined));

const defaultCode = formatCodeJS(`/* Enter Code ... */
/* --- Example ---
/* const res = await rpc.http.island.findMany({limit: []})
/* return { rpc, res };
*/
\n
return { rpc };
`);

const codeJS = useStorage('code-js', defaultCode);
const codeJSON = ref(`{ }`);

const { execAsyncScript } = useApi();
const getExtensions = (lang) => {
  return [lang(), theme.value].filter((x) => x);
};

const view = shallowRef();
const handleReady = (payload) => {
  view.value = payload.view;
};

const formatCode = () => {
  try {
    codeJS.value = formatCodeJS(codeJS.value);
  } catch (ex) {
    codeJSON.value = toJson(ex);
  }
};

const runScript = async () => {
  try {
    const result = await execAsyncScript(codeJS.value);
    codeJSON.value = toJson(result);
  } catch (ex) {
    codeJSON.value = toJson({ status: 'error', error: String(ex) });
  }
};

onBeforeMount(runScript);

const formatAndRunScript = debounce(() => {
  formatCode();
  runScript();
}, 2000);

onMounted(() => {
  document.addEventListener('keydown', formatAndRunScript);
});
onUnmounted(() => document.removeEventListener('keydown', formatAndRunScript));
</script>
