<template>
    <input
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="emits('input',this.value)"
        @change="emits('change',this.value)"/>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {type: String, default: ""},
  placeholder: {type: String, default: "" },
  disabled:{ type:Boolean,default:false}
})

const emits = defineEmits(['input','change'])


</script>

<style scoped>

</style>
