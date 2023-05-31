<template>
  <v-container>
    <h1 class='text-h4 mt-6'>API</h1>
    <div class='mt-10'></div>
    <h2 class='text-h6 mb-4'>Namespaces</h2>
    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for='[rootName, {meta: {description: rDesc, name: rName}}] in Object.entries(config)'
      >
        <template #title>
          <div class='text-subtitle-1'>
            {{ rName ?? rootName }}
          </div>
        </template>

        <template #text>
          <div v-if='rDesc' class='mt-3 text-medium-emphasis'>
            {{ rDesc }}
          </div>

          <h3 class='text-subtitle-1 mt-4'>Methods</h3>
          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for='[methodName, methodOptions] in getMethods(rootName)'
              :key='methodName'
              elevation='1'
            >
              <template #title>
                {{ methodOptions?.method }}
                <span
                  v-if='methodOptions.meta.name && methodOptions?.method !== methodOptions.meta.name'
                  class='ml-4 text-disabled'
                >
                  {{ methodOptions.meta.name }}
                </span>
              </template>
              <template #text>
                <Method
                  :name='methodOptions.method'
                  :namespace='rootName'
                  :description='methodOptions.meta?.description'
                  :params='methodOptions.params'
                  :returns='methodOptions.returns'
                />
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { inject } from 'vue';
import Method from '@/components/Method.vue';

const API = inject('api');
const { api, config, structureMap } = API.rpc.http;

const getMethods = (namespace) => Array.from(structureMap.entries()).filter(
  ([key]) => {
    const _key = key.split('.').slice(0, -1).join('.');
    return namespace === _key;
  },
);
</script>
