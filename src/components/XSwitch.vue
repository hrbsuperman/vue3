<template>
  <div class="x-switch" :class="{disabled:disabled}">
    <div >

    </div>
    <div class="view"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {type: String, default: ""},
  disabled: {type: Boolean, default: false}
})
</script>

<style scoped lang="less">
.x-switch {
  display: inline-block;
  height: var(--FormElementHeight);
  position: relative;
  padding: 1px;
  //禁用
  &.disabled{
    .view{
      cursor: not-allowed;
    }
  }
  .checked {
    .view:after {
      right: 3px !important;
    }
  }

  .view {
    display: flex;    align-items: center;
    border-radius: 10px;
    background-color: var(--theme-color);
    width: 40px;
    height: 20px;
    cursor: pointer;

    &:after {
      content: ' ';
      position: absolute;
      height: 16px;
      width: 16px;
      background-color: #fff;
      border-radius: 16px;
      top: 3px;
      left: 3px;
    }
  }
}
</style>
