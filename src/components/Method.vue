<script setup>
import { computed } from 'vue';
import SchemaFields from '@/components/SchemaFields.vue';
import CodeBlock from '@/components/CodeBlock.vue';
import { useApi } from '@/composables/api';

const props = defineProps({
  name: String,
  namespace: String,
  description: String,
  params: Object,
  returns: Object,
});

const hasRequest = computed(() => !!props.params?.fields?.length);
const hasResponse = computed(() => !!props.returns?.fields?.length);

const path = computed(() =>
  [props.namespace, props.name].filter((x) => !!x).join('.'),
);

const methodSchemas = computed(() =>
  Object.entries({
    ...(hasRequest.value && { Request: props.params }),
    ...(hasResponse.value && { Response: props.returns }),
  }),
);

const client = useApi().currentClient;

const code = computed(
  () =>
    `rpc.${client.value}.${path.value}(${hasRequest.value ? 'payload' : ''})`,
);
</script>

<template>
  <CodeBlock
    class="mt-4"
    :code="code"
    :schema="hasRequest ? params : undefined"
  />

  <v-divider />

  <div class="mt-5">
    Path:
    <v-chip label="" density="default" class="ml-2 text-subtitle-1">
      <code>{{ path }}</code>
    </v-chip>
  </div>

  <div v-if="description" class="mt-3 text-medium-emphasis">
    {{ description }}
  </div>

  <v-expansion-panels class="mt-3" multiple="">
    <v-expansion-panel v-for="[name, schema] of methodSchemas" :title="name">
      <template #text>
        <SchemaFields v-if="schema?.fields" :fields="schema.fields" />
        <div v-else class="text-medium-emphasis text-subtitle-1">
          Schema: <span class="text-primary">{{ schema?.['#ref'] }}</span>
        </div>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
