<template>
  <div class="x-select-box" :class="{expand:expand}">
    <div class="x-select" tabindex="-1" ref="SelectRef" @click="XSelect_Click" @blur="XSelect_Blur($event)">
      <span v-if="$slots.text" class="text">
        <slot name="text" />
      </span>
      <span v-else class="text" :class="{ placeholder:!selected }">
        {{ ((textBind ? (selected ? (selected[textBind] || "&nbsp;") : null) : selected) || placeholder) || "&nbsp" }}
      </span>
      <span :class="{icon:true, activeClear}" @mousemove="Icon_MouseMove" @mouseleave="activeClear=false">
        <i class="icon-arrow-down"></i>
        <i @click="IconClear_Click" style="opacity:0" class="FE icon-close"></i>
      </span>
    </div>
    <ul class="options"
        :style=" extendUp?`top:${ (-34 * ((props.options || []).length > 5 ? 5 : (props.options || []).length)) - 6 }px`:'' ">
      <li class="option-item" v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          :class="{'selected': item === selected}"
          @click="XSelect_Item_Click(item)">{{ textBind ? (item[textBind] || "&nbsp;") : item }}
      </li>
    </ul>
  </div>

</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Object, default: null },
  textBind: { type: String, default: "text" },//显示属性
  valueBind: { type: String, default: "value" },//值属性
  options: { type: Array<any> },//[10,20,"任意"] [{text:'',value:''}]
  clear: { type: Boolean, default: true },
  extendUp: { type: Boolean, default: false },//向上展开
  placeholder: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  setSelectOption: {
    type: Function, default: (option: any) => {
      return option === "";
    }
  }
});
//选中项
const selected = ref<any | null>(null);
//展开状态
const expand = ref<boolean>(false);
//拦截Click
const blockClick = ref<boolean>(false);
//hasValue && hover
const activeClear = ref<boolean>(false);

onMounted(() => {
  console.log(props.options);
});

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
function XSelect_Item_Click(item: any) {
  selected.value = item;
  emits("update:modelValue", props.valueBind ? item[props.valueBind] : item);
}

//activeClear
function Icon_MouseMove() {
  if (props.clear && !activeClear.value && props.modelValue)
    activeClear.value = true;
}

//clear modelValue
function IconClear_Click() {
  if (activeClear.value) {
    blockClick.value = true;
    selected.value = null;
    activeClear.value = false;
    emits("update:modelValue", null);
  }
}
</script>
