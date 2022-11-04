<template>
    <input class="x-input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="change($event)"
   />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {type: String, default: ""},
  placeholder: {type: String, default: "" },
  disabled:{ type:Boolean,default:false}
})

const emits = defineEmits(['update:modelValue'])

function change (e:any){
  console.log(e);

  emits('update:modelValue',e.target.value);
}

</script>
