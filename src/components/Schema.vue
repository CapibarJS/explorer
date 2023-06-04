<script setup>
import SchemaFields from '@/components/SchemaFields.vue';

defineProps({
  name: String,
  description: String,
  fields: Array,
});
</script>

<template>
  <div class="mt-5">
    Path:
    <v-chip :label="true" density="default" class="ml-2 text-subtitle-1">
      <code>{{ name }}</code>
    </v-chip>
  </div>

  <div v-if="description" class="mt-3 text-medium-emphasis">
    {{ description }}
  </div>

  <div class="mt-5 text-h6">Fields</div>
  <SchemaFields :fields="fields" />
</template>
