<template>
  <div class="x-select-box" :class="{expand}">
    <!--    @wheel="XSelect_Wheel($event)"-->
    <div class="x-select" tabindex="-1" ref="SelectRef" @click="XSelect_Click" @blur="XSelect_Blur($event)">
      <!-- 能自定义显示内容，与li显示内容，有需求再说 -->
      <!--      <span v-if="$slots.text" class="text">-->
      <!--        <slot name="text" />-->
      <!--      </span>-->
      <!--      <span v-if="$slots.option" class="text">-->
      <!--        <slot name="option" />-->
      <!--      </span>-->
      <span class="text" :class="{ placeholder:selectedIdx < 0 }">
        {{ SelectedText() || "&nbsp;" }}
      </span>
      <span class="icon" :class="{activeClear}" @mousemove="Icon_MouseMove" @mouseleave="activeClear=false">
        <i class="icon-arrow-down"></i>
        <i @click="IconClear_Click" style="opacity:0" class="FE icon-close"></i>
      </span>
    </div>
    <ul class="options"
        :style=" extendUp?`top:${ (-34 * ((props.options || []).length > 5 ? 5 : (props.options || []).length)) - 6 }px`:'' ">
      <li v-if="(props.options || []).length===0" class="empty">
        <div style="text-align: center;line-height: 100px">Empty 无数据</div>
      </li>
      <li class="option-item" v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          :class="{'selected': index === selectedIdx}"
          @click="XSelect_Item_Click(index)">{{ textBind ? (item[textBind] || "&nbsp;") : item }}
      </li>
    </ul>
  </div>

</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: String || Object, default: null },
  textBind: { type: String, default: "text" },//显示属性
  valueBind: { type: String, default: "value" },//值属性
  options: { type: Array<any> },//[10,20,"任意"] [{text:'',value:''}]
  clear: { type: Boolean, default: true },
  extendUp: { type: Boolean, default: false },//向上展开
  placeholder: { type: String || Object, default: "" },
  disabled: { type: Boolean, default: false }
});
//选中项
const selectedIdx = ref<number>(-1);
//展开状态
const expand = ref<boolean>(false);
//拦截Click
const blockClick = ref<boolean>(false);
//hasValue && hover
const activeClear = ref<boolean>(false);

const img_empty = ref("");

onMounted(() => {
  //import("@/assets/imgs/empty.png").then(e => img_empty.value = e.default);
  // if (props.options && props.modelValue) {
  //   props.options.forEach((item,index) => {
  //     if(props.SelectProvider(item)){
  //       selectedIdx.value = index;
  //       return;
  //     }
  //   });
  // }
});

watch(() => [props.options, props.modelValue], (val, old) => {
  if (old?.length != val?.length) selectedIdx.value = -1;
  console.log('watch value change');
  //selectedIdx.value = -1;
});

function DefaultSelectProvider(item: any) {
  // return (!props.valueBind && !props.textBind)
  //   ? item === props.modelValue
  //   : item[props.valueBind] === props.modelValue;
}

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
  }, 240);
}

// 下拉列表点击事件
function XSelect_Item_Click(index: number) {
  selectedIdx.value = index;
  emits("update:modelValue", props.valueBind ? ((props.options || [])[index][props.valueBind]) : (props.options || [])[index]);
}

//XSelect_Wheel 这功能在有滚动条时候，一遍滚动一遍change selected 有点怪
function XSelect_Wheel(e: any) {
  if (expand.value) {
    let index = selectedIdx.value + (e.deltaY > 0 ? 1 : -1);
    if (index >= 0 && index < (props.options || []).length) {
      XSelect_Item_Click(selectedIdx.value + (e.deltaY > 0 ? 1 : -1));
    }
  }
}


//activeClear
function Icon_MouseMove() {
  if (props.clear && !activeClear.value && props.modelValue)
    activeClear.value = true;
}

//clear modelValue
function IconClear_Click() {
  if (activeClear.value) {
    selectedIdx.value = -1;
    expand.value = false;//收起
    blockClick.value = true;//拦截控制dialog的冒泡
    activeClear.value = false;//clear 状态
    emits("update:modelValue", null);
  }
}

function SelectedText() {
  let text = undefined;
  if (props.options && selectedIdx.value >= 0 && selectedIdx.value < props.options.length) {
    text = props.textBind
      ? (props.options[selectedIdx.value][props.textBind])
      : (props.options[selectedIdx.value]);
  }
  return text || props.placeholder;
}
</script>
