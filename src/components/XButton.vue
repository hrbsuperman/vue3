<template>
  <button class="x-button"> {{text}}</button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {type: String, default: ""},
  disabled: {type: Boolean, default: false}
})
</script>

<style scoped lang="less">
  .x-button{

  }
</style>
