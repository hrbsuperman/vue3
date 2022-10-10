<template>
  <div class="x-select" :class="{expand:expand}">
    <div class="view" tabindex="-1" ref="smSelectRef" @click="smSelect" @blur="smSelectBlur">
      <span>{{ (selected?.text||placeholder) || '&nbsp' }}</span>
      <i class="icon-arrow-down"></i>
    </div>
    <ul class="options">
      <li class="option-item" v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          :class="{'selected': item.value === useValue}"
          @click.stop="li_click(item)">{{ item.text }}
      </li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import {ref, toRefs} from 'Vue';
import type {XSelectItem} from "@/entity/component/XSupport";
import {reactive} from "vue";

const emits = defineEmits(['update:modelValue'])


const props = defineProps({
  value: {type: String, default: ""},
  options: {type: Array<XSelectItem>},
  placeholder: {type: String, default: ""},
  disabled: {type: Boolean, default: false}
})
const selected = ref<XSelectItem | null>(null);
const expand = ref<boolean>(false);
const useValue = ref<string>("");


// 点击事件 控制显示隐藏
function smSelect() {
  expand.value = !expand.value;
  /**
   * 给div增加focus
   * 必须添加属性 tabindex="-1"
   * 通过@blur 事件 让下拉显示框隐藏
   * */
  //$refs.smSelectRef.focus()
}

// div失去焦点事件
function smSelectBlur() {
  setTimeout(() => {
    expand.value = false
  }, 200)
}

// 下拉列表点击事件
function li_click(item: XSelectItem) {
  selected.value = item;
  useValue.value = item.value
  expand.value = false
  emits('update:modelValue', item.value)
}

</script>

<style scoped lang="less">
.x-select {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  &.expand{
    .options{
      display: block !important;
    }
  }
  .view {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    span {
      width: 100%;
      text-align: left;
      outline: none;
    }

    i {
      flex-shrink: 1;
      width: 20px;
    }
  }

  .options {
    display: none;
    position: absolute;
    width: 100%;
    left: 0;
    top: 32px;
    line-height: 34px;
    max-height: 6rem;
    border: 1px solid #eee;
    background-color: #fff;
    z-index: 2002;
    overflow-y: auto;

    .option-item {
      text-align: left;
      padding:0 0.7em;
      font-size: 0.9em;
      &:hover {
        background-color: #F5F5F5;
      }
    }

    .selected {
      background-color: #E3F4FC !important;
      font-weight: 700;
    }
  }
}

</style>
