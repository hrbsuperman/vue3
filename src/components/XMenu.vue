<template>
  <template v-for="item in dataList">
    <div :class="{ 'menu-main':true,activeName:true }" @click.stop ="toggleItem(item)">
      <i :class="'icon '+ (item.icon)"></i>
      <div class="text">
        {{ item.label }}
      </div>
      <div class="arrow">
        <i v-if="item?.children?.length" class="icon-arrow-down"></i>
      </div>
    </div>
    <div class="menu-child-box" v-if="item.children?.length"
         :style="{ maxHeight:item.displayAnimation ?(item.maxHeight || maxHeightCalc(item))+'px' :'0px !important' }">
      <div :class="item.displayAnimation?'opacityIn':'opacityOut'"
           :style="{ marginLeft:'0.75em'}">
        <x-menu @change="toggleItem" :dataList="item?.children"></x-menu>
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import type {XMenuItem} from '@/entity/component/XSupport';
import {reactive} from "vue";
const emit = defineEmits(['change']);

const current = reactive({open:{}});



const props = defineProps({
  // 数据源列表
  dataList: {
    required: true,
    type: Array<XMenuItem>
  },
  activeItem: String
})

// 展开收起方法
const toggleItem = (item: XMenuItem) => {
  console.log('toggleItem 展开的时候触发两次？',item)
  if (item.children && item.children.length) {
    item.displayAnimation = !item.displayAnimation;
    //淡出延迟隐藏
    if (!item.displayAnimation) {
      current.open = {};
      window.setTimeout(() => {
        item.display = false;
      }, 500)
    } else {
      if(current.open){
          toggleItem(current.open as XMenuItem);
      }
      current.open = item;
      item.display = true;
    }
  } else {
    //router
    item.name && emit('change', item);
  }
}

//计算子菜单，全部展开高度
function maxHeightCalc(item: XMenuItem) {
  let height = 0;
  if (item.children && item.children.length) {
    item.children.map(e => {
      //与main.less .menu-main { height } 设置数值一致
      height += 45;
      height += maxHeightCalc(e);
    })
  }
  item.maxHeight = height;
  return height;
}
</script>
