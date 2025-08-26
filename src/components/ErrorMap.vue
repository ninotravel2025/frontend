<template>
  <div v-if="errors && errors.length" class="mt-1 text-red-600 text-sm italic space-y-1">
    <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorMap',
  props: {
    errors: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>