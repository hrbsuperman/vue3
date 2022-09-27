<template>
  <div :class="menuSwitchOpen?'menuOpen':'menuStow'">
    <div class="menu">
      <div class="logo"
           style="font-weight: 700; color:rgb(var(--gray-4));text-align: center;line-height: var(--header-height);">
        Admin
      </div>
      <!--左侧菜单-->
      <x-menu :dataList="x_menu_data"/>
    </div>
  </div>
  <div class="main">
    <div class="header">
      <div class="control">
        <!--菜单展开/收起-->
        <i :class="{'icon-shouqi':true,'rota180':!menuSwitchOpen}" :title="menuSwitchOpen?'收起':'展开'"
           @click="menuSwitchOpen = !menuSwitchOpen"></i>
        <!--面包屑-->
        <div class="breadLink">
          工作台
        </div>
        <!--用户信息&设置-->
        <div class="action">
          <i title="通知" class="icon-tongzhi"></i>
          <i :title="fullScreenStatus?'退出全屏':'全屏'" :class="fullScreenStatus?'icon-tuichuquanping':'icon-quanping'"
             @click="fullScreen"></i>
          <div class="user">
            <div class="photo">
              <span class="iconfont icon-emoji" style="font-size: 1.4em;margin:0 0.8em"></span>
            </div>
            <span>Admin</span>
          </div>
          <i title="设置" class="icon-set"></i>
        </div>
      </div>
      <!--页面 tab -->
      <div class="pageTab">

      </div>
    </div>
    <div class="page">
      <router-view />
      <router-view name="test" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, h, Transition, reactive} from "vue";
import {useRouter} from 'vue-router';
import type {x_menu_item} from "@/entity/system/x_menu_item";
import XMenu from "@/components/XMenu.vue";

h(Transition, {})
const router = useRouter();
const menuSwitchOpen = ref(true);
const fullScreenStatus = ref(false);

// 菜单Data
const x_menu_data = reactive<x_menu_item[]>(
    [
      {
        label: '工作台',
        value: '1',
        icon: 'icon-all'
      }, {
        label: '客户管理',
        value: '3',
        icon:'icon-Customermanagement',
        children:[]
      },
      {
        label: '系统设置',
        value: '2',
        icon: 'icon-set',
        children: [
          {
            label: '菜单管理',
            value: '1-1',
          },
          {
            label: '多级菜单',
            value: '1-2',
            children: [{label: '多多级菜单', value: '1-2-1'}]
          },
          {label: '多级菜单1'},
          {label: '多级菜单1'},
          {label: '多级菜单1'},
          {label: '多级菜单1'},
          {label: '多级菜单1'}
        ]
      },{label:'test'}

    ]);

//全屏
function fullScreen() {
  if (document.documentElement.requestFullscreen) {
    fullScreenStatus.value = !fullScreenStatus.value;
    if (fullScreenStatus.value === true)
      document.documentElement.requestFullscreen();
    else
      document.exitFullscreen();
  }
}

onMounted(() => {
  //判断当前路由，刷新进入页面，给当前route 对应 Menu Active


  window.onresize = () => {
    //没通过按钮进入全屏状态，更正 fullScreenStatus
    let isFullScreen = !(window.screen.height - window.document.body.offsetHeight > 5)
    console.log('isFullScreen', isFullScreen)
    fullScreenStatus.value != isFullScreen && (fullScreenStatus.value = isFullScreen)
  }
})

</script>

<style scoped>
</style>
