<script setup>
defineProps({
  fields: Array
})

const classes = {
  type: (x) => {
    if(!!x.ref) return 'text-primary'
    if(x.type === 'unknown') return 'text-disabled'
    return ''
  },
  required: x =>!x.required ? "text-disabled": ""
}
</script>

<template>
  <v-table density='compact'>
    <thead>
    <tr>
      <th class='text-left'>Name</th>
      <th class='text-left'>Type</th>
      <th class='text-left'>Required</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for='field in fields'>
      <td>{{ field.name }}</td>
      <td :class='classes.type(field)'>{{ field?.ref ?? field.type }}</td>
      <td :class='classes.required(field)'>{{ field.required }}</td>
    </tr>
    </tbody>
  </v-table>
</template>
