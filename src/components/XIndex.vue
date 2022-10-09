<template>
    <input
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="emits('update:modelValue', $event.target.value)"
        @change="emits('update:modelValue', $event.target.value)"/>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {type: String, default: ""},
  placeholder: {type: String, default: "" },
  disabled:{ type:Boolean,default:false}
})

const emits = defineEmits(['update:modelValue'])

</script>

<style scoped>

</style>
