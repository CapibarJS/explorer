<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const props = defineProps({
  source: String,
  size: {
    type: String,
    default: 'small',
  },
  variant: String as any,
});
const { copy, copied } = useClipboard({ source: props.source });
</script>

<template>
  <v-btn
    :icon="
      !copied
        ? 'mdi-clipboard-multiple-outline'
        : 'mdi-clipboard-check-multiple-outline'
    "
    :color="copied ? 'success' : ''"
    :size="size"
    :variant="variant"
    @click="copy(source)"
  />
</template>
