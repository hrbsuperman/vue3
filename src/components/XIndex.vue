<template>
  <span class="x-input">
    <input
        v-model="value"
        :placeholder="placeholder"
        :disabled="disabled"/>
  </span>
</template>

<script setup lang="ts">

const props = defineProps({
  value: {type: String, default: ""},
  placeholder: {type: String, default: "" },
  disabled:{ type:Boolean,default:false}
})
</script>

<style scoped>

</style>
