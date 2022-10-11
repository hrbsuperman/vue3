<template>
  <div class="x-select-box" :class="{expand:expand}">
    <div class="x-select" tabindex="-1" ref="smSelectRef" @click="smSelect" @blur="smSelectBlur">
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
