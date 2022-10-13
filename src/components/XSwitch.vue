<template>
  <div class="x-switch-box" :class="{disabled:disabled,checked:modelValue}">
    <div @click="modelValue=!modelValue;emits('update:modelValue', modelValue)" class="x-switch">
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {type: Boolean, default: ""},
  disabled: {type: Boolean, default: false}
})
const emits = defineEmits(['update:modelValue'])
</script>
