<template>
  <button><i class="icon-close"></i> {{text}}</button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {type: String, default: ""},
  disabled: {type: Boolean, default: false}
})
</script>

<style scoped>

</style>
