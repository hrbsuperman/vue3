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

<style scoped lang="less">
.x-switch-box {
  height: var(--FormElementHeight);
  box-sizing: border-box;
  width: 45px;
  display: inline-block;
  position: relative;

  &.checked .x-switch:after {
    left: 22px !important;
  }


  .x-switch {
    cursor: pointer;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    line-height: var(--FormElementHeight);
    position: relative;
    padding: 1px;
    //禁用
    &.disabled {

      cursor: not-allowed;
      box-sizing: border-box;
    }

    background-color: var(--theme-color);
    width: 40px;
    height: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    align-items: center;

    &:after {
      content: ' ';
      position: absolute;
      height: 16px;
      width: 16px;
      background-color: #fff;
      border-radius: 16px;
      top: 2px;
      left: 2px;
      transition: left .18s;
    }
  }
}
</style>
