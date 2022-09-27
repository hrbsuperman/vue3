<template>
  <template v-for="item:x_menu_item in dataList">
    <div :class="`menu-main ${item.displayAnimation ?'active':''}`" @click="toggleItem(item)">
      <i :class="'icon '+item.icon"></i>
      <div class="text">
        {{ item.label }}
      </div>
      <div class="arrow">
        <i v-if="item?.children?.length" class="icon-arrow-down"></i>
      </div>
    </div>
    <div class="menu-child-box"
         :style="{ maxHeight:item.displayAnimation ?(item.maxHeight || maxHeightCalc(item))+'px' :'0px !important' }">
      <div :class="item.displayAnimation?'opacityIn':'opacityOut'"
           :style="{ marginLeft:'0.5em'}">
        <x-menu v-bind="$props" :data-list="item?.children"></x-menu>
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import type {x_menu_item} from '@/entity/system/x_menu_item';
import { useRouter } from 'vue-router'

const router = useRouter();
const props = defineProps({
  // 数据源列表
  dataList: {
    required: true,
    type: Array<x_menu_item>
  }
})
// 展开收起方法
const toggleItem = (item: x_menu_item) => {
  if (item.children && item.children.length) {
    item.displayAnimation = !item.displayAnimation;
    //淡出延迟隐藏
    if(!item.displayAnimation){
      window.setTimeout(() => {
        item.display = false;
      }, 350)
    }else{
      item.display = true;
    }
  } else {
    //router

    router.push({name:'test'});

  }
}
//计算子菜单，全部展开高度
function maxHeightCalc(item: x_menu_item) {
    let height = 0;
    if(item.children && item.children.length){
      item.children.map(e=>{
        //与main.less .menu-main { height } 设置数值一致
        height += 45;
        height += maxHeightCalc(e);
      })
    }
    item.maxHeight = height;
    return height;
}
</script>
