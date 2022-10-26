<template>
  <div class="x-select-box" :class="{expand:expand}">
    <div class="x-select" tabindex="-1" ref="SelectRef" @click="XSelect_Click" @blur="XSelect_Blur($event)">
      <span class="view" :class="{ placeholder:!selected }">{{ (selected?.text || placeholder) || "&nbsp" }}</span>
      <span :class="{icon:true, activeClear}" @mousemove="Icon_MouseMove" @mouseleave="activeClear=false">
        <i class="icon-arrow-down"></i>
        <i @click="IconClear_Click" style="opacity:0" class="FE icon-close"></i>
      </span>
    </div>
    <ul class="options">
      <li class="option-item" v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          :class="{'selected': item.value === selected?.value}"

          @click="XSelect_Item_Click(item)">{{ item.text }}
      </li>
    </ul>
  </div>

</template>
<script setup lang="ts">
import { ref } from "vue";
import type { XSelectItem } from "@/entity/component/XSupport";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: String, default: "" },
  options: { type: Array<XSelectItem> },
  placeholder: { type: String, default: "" },
  disabled: { type: Boolean, default: false }
});
const selected = ref<XSelectItem | null>(null);
const expand = ref<boolean>(false);
//拦截Click
const blockClick = ref<boolean>(false);
//hasValue && hover
const activeClear = ref<boolean>(false);

// 点击事件 控制显示隐藏
function XSelect_Click() {
  if (!blockClick.value) {
    expand.value = !expand.value;
  }
  blockClick.value = false;
  /**
   * 给div增加focus
   * 必须添加属性 tabindex="-1"
   * 通过@blur 事件 让下拉显示框隐藏
   * */
}

// div失去焦点事件
function XSelect_Blur(e: any) {
  setTimeout(() => {
    expand.value = false;
  }, 180);
}

// 下拉列表点击事件
function XSelect_Item_Click(item: XSelectItem) {
  selected.value = item;
  emits("update:modelValue", item.value);
}

//activeClear
function Icon_MouseMove() {
  if (!activeClear.value && props.modelValue)
    activeClear.value = true;
}

//clear modelValue
function IconClear_Click() {
  if (activeClear.value) {
    blockClick.value = true;
    selected.value = null;
    activeClear.value = false;
    emits("update:modelValue", "");
  }
}
</script>
