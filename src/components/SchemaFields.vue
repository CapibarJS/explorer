<script setup>
defineProps({
  fields: Array,
});

const classes = {
  type: (x) => {
    if (!!x.ref) return 'text-primary';
    if (x.type === 'unknown') return 'text-disabled';
    return '';
  },
  required: (x) => (!x.required ? 'text-disabled' : ''),
};
</script>

<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Type</th>
        <th class="text-left">Required</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="field in fields">
        <td>
          <code>{{ field.name }}</code>
        </td>
        <td :class="classes.type(field)">
          <code>{{ field?.ref ?? field.type }}</code>
        </td>
        <td :class="classes.required(field)">
          <code>{{ field.required }}</code>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
