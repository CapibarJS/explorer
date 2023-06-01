<template>
  <v-container>
    <h1 class="text-h4 mt-6">Schemas</h1>
    <div class="mt-10"></div>
    <h2 class="text-h6 mb-4">Namespaces</h2>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="namespace in namespaces">
        <template #title>
          <div class="text-subtitle-1">
            {{ namespace }}
          </div>
        </template>

        <template #text>
          <v-expansion-panels multiple class="mt-2">
            <v-expansion-panel
              v-for="[schemaName, schema] in getSchemas(namespace)"
              elevation="1"
            >
              <template #title>
                <div class="text-subtitle-1">
                  {{ schemaName.split('.').pop() }}
                </div>
              </template>
              <template #text>
                <Schema
                  :name="schemaName"
                  :description="schema.meta.description"
                  :fields="schema.fields"
                />
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider class="mt-10" />

    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="[schemaName, schema] in schemasWithoutNamespace"
      >
        <template #title>
          <div class="text-subtitle-1">
            {{ schemaName }}
          </div>
        </template>
        <template #text>
          <Schema
            :name="schemaName"
            :description="schema.meta.description"
            :fields="schema.fields"
          />
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { inject } from 'vue';
import Schema from '@/components/Schema.vue';

const API = inject('api');
const rpc = API?.rpc?.http ?? {};

const schemas = rpc?.schemas ?? {};

const namespaces = Array.from(
  new Set(
    Object.keys(schemas).map((x) => {
      const [name, ...namespace] = x.split('.').reverse();
      return namespace.join('.') ?? '';
    }),
  ),
).filter((x) => !!x);

const getSchemas = (namespace = null) =>
  Object.entries(schemas).filter(([key]) => {
    if (namespace === null) return key.split('.').length === 1;
    const _key = key.split('.').slice(0, -1).join('.');
    return namespace === _key;
  });

const schemasWithoutNamespace = getSchemas();
</script>
