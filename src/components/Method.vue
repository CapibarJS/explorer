<script setup>
import { computed } from 'vue';
import SchemaFields from '@/components/SchemaFields.vue';

const props = defineProps({
  name: String,
  namespace: String,
  description: String,
  params: Object,
  returns: Object,
});
const path = computed(() => [props.namespace, props.name].filter(x => !!x).join('.'));

const methodSchemas = computed(() => Object.entries({
  Request: props.params,
  Response: props.returns,
}))
</script>

<template>
  <div class='mt-5'>
    Path:
    <v-chip label='' density='default' class='ml-2 text-subtitle-1'>{{ path }}</v-chip>
  </div>

  <div v-if='description' class='mt-3 text-medium-emphasis'>
    {{ description }}
  </div>

  <div class='mt-3 d-flex' style='gap: 1rem'>
    <v-card
      v-for='[name, schema] of methodSchemas'
      :title='name'
      width='50%'
    >
      <template #text>
        <SchemaFields
          v-if='schema?.fields'
          :fields='schema.fields'
        />
        <div v-else class='text-medium-emphasis text-subtitle-1'>
          Schema: <span class='text-primary'>{{ schema?.['#ref'] }}</span>
        </div>
      </template>
    </v-card>
  </div>
</template>
