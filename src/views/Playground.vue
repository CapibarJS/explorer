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
      @change="run('change', $event)"
    />
    <div style="width: 0.75rem; height: 100%" />
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
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { computed, inject, onMounted, ref, shallowRef } from 'vue';
import { useTheme } from 'vuetify';
import { debounce, formatCodeJS } from '@/utils';

const isDarkTheme = computed(() => useTheme().global.current.value.dark);
const theme = computed(() => (isDarkTheme ? oneDark : undefined));

const toJson = (json) => JSON.stringify(json, null, 2);

const defaultCode = formatCodeJS(`/* Enter Code ... */
/* --- Example ---
/* const res = await rpc.http.island.findMany({limit: []})
/* return { rpc, res };
*/
\n
return { rpc };
`);

const codeJS = ref(defaultCode);
const codeJSON = ref(`{ }`);

const API = inject('api');
window.rpc = API?.clients;
document.rpc = window.rpc;
const getExtensions = (lang) => {
  return [lang(), theme.value].filter((x) => x);
};

const view = shallowRef();
const handleReady = (payload) => {
  view.value = payload.view;
};

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const formatCode = debounce((code) => {
  try {
    codeJS.value = formatCodeJS(code);
  } catch (ex) {
    codeJSON.value = toJson(ex);
  }
}, 2000);

const run = async (event, code) => {
  formatCode(code);
  try {
    const script = `${code}`;
    const func = new AsyncFunction(script);
    const result = await func();
    codeJSON.value = toJson(result);
  } catch (ex) {
    codeJSON.value = toJson({ status: 'error', error: String(ex) });
  }
};
onMounted(() => run('mounted', codeJS.value));
</script>
