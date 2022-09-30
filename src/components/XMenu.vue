<template>
  <template v-for="item in dataList">
    <div :class="`menu-main ${item.displayAnimation ?'active':''}`" @click="toggleItem(item)">
      <i :class="'icon '+item.icon"></i>
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
        <x-menu :dataList="item?.children"></x-menu>
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import type {XMenuItem} from '@/entity/system/XSupport';

const emit = defineEmits(['change']);

// import { useRouter } from 'vue-router'
// const router = useRouter();


const props = defineProps({
  // 数据源列表
  dataList: {
    required: true,
    type: Array<XMenuItem>
  }
})
// 展开收起方法
const toggleItem = (item: XMenuItem) => {
  if (item.children && item.children.length) {
    item.displayAnimation = !item.displayAnimation;
    //淡出延迟隐藏
    if (!item.displayAnimation) {
      window.setTimeout(() => {
        item.display = false;
      }, 350)
    } else {
      item.display = true;
    }
  } else {
    //router
    emit('change', item);
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
