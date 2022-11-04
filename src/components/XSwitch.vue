<template>
  <div class="x-switch-box" :class="{disabled:disabled,checked:checked}">
    <div @click="checked=!checked;emits('update:modelValue', checked)" class="x-switch">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";

const props = defineProps({
  modelValue: {type: Boolean||undefined, default: ""},
  disabled: {type: Boolean, default: false}
})
const checked = ref(false);
const emits = defineEmits(['update:modelValue'])

onMounted(()=>{
  checked.value = props.modelValue;
});
</script>
