<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h4">API</h1>
      </v-col>
      <v-col cols="4" md="2">
        <v-select
          label="Client"
          v-model="currentClient"
          :items="clients"
          variant="outlined"
          density="compact"
          hide-details
        ></v-select>
      </v-col>
    </v-row>
    <div class="mt-10"></div>
    <h2 class="text-h6 mb-4">Namespaces</h2>
    <v-expansion-panels :multiple="true">
      <v-expansion-panel
        v-for="[
          rootName,
          {
            meta: { description: rDesc, name: rName },
          },
        ] in Object.entries(configs)"
      >
        <template #title>
          <div class="text-subtitle-1">
            {{ rName ?? rootName }}
          </div>
        </template>

        <template #text>
          <div v-if="rDesc" class="mt-3 mb-4 text-medium-emphasis">
            {{ rDesc }}
          </div>

          <!--          <h3 class="text-subtitle-1 mt-4">Methods</h3>-->
          <v-expansion-panels :multiple="true">
            <v-expansion-panel
              v-for="[methodName, methodOptions] in getMethods(rootName)"
              :key="methodName"
              elevation="1"
            >
              <template #title>
                <span class="font-weight-bold text-subtitle-1">{{
                  methodOptions?.method
                }}</span>
                <span
                  v-if="
                    methodOptions.meta.name &&
                    methodOptions?.method !== methodOptions.meta.name
                  "
                  class="ml-4 text-disabled"
                >
                  {{ methodOptions.meta.name }}
                </span>
              </template>
              <template #text>
                <Method
                  :name="methodOptions.method"
                  :namespace="rootName"
                  :description="methodOptions.meta?.description"
                  :params="methodOptions.params"
                  :returns="methodOptions.returns"
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
import Method from '@/components/Method.vue';
import { useApi } from '@/composables/api';
import { useMeta } from '@/composables/meta';
import { computed } from 'vue';

const { methods, configs } = useApi();

const getMethods = (namespace) =>
  Array.from(methods.value.entries()).filter(([key]) => {
    const _key = key.split('.').slice(0, -1).join('.');
    return namespace === _key;
  });

const { meta } = useMeta();
const clients = computed(() => meta.value?.meta?.clients?.map((x) => x.name));
const { currentClient } = useApi();
</script>
