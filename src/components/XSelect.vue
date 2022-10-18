<template>
  <div class="x-select-box" :class="{expand:expand}">
    <div class="x-select" tabindex="-1" ref="SelectRef" @click="XSelect_Click" @blur="XSelect_Blur($event)">
      <span>{{ (selected?.text || placeholder) || '&nbsp' }}</span>
      <i class="icon-arrow-down"></i>
    </div>
    <ul class="options">
      <li class="option-item" v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          :class="{'selected': item.value === selected?.value}"
          @click.stop="XSelect_Item_Click(item)">{{ item.text }}
      </li>
    </ul>
  </div>

</template>
<script setup lang="ts">
import {ref} from 'vue';
import type {XSelectItem} from "@/entity/component/XSupport";

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {type: String, default: ""},
  options: {type: Array<XSelectItem>},
  placeholder: {type: String, default: ""},
  disabled: {type: Boolean, default: false}
})
const selected = ref<XSelectItem | null>(null);
const expand = ref<boolean>(false);
// 点击事件 控制显示隐藏
function XSelect_Click() {
  expand.value = !expand.value;
  /**
   * 给div增加focus
   * 必须添加属性 tabindex="-1"
   * 通过@blur 事件 让下拉显示框隐藏
   * */
}
// div失去焦点事件
function XSelect_Blur(e:any) {
  setTimeout(() => {
    expand.value = false
  }, 180)
}
// 下拉列表点击事件
function XSelect_Item_Click(item: XSelectItem) {
  selected.value = item;
  emits('update:modelValue', item.value)
}
</script>
