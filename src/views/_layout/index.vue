<template>
  <div :class="menuSwitchOpen?'menuOpen':'menuStow'">
    <div class="menu">
      <div class="logo"
           style="font-weight: 700; color:rgb(var(--gray-4));text-align: center;line-height: var(--header-height);">
        Admin
      </div>
      <!--左侧菜单-->
      <x-menu :dataList="xMenuData" @change="menu_Change"/>
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
          <i @click="pageTest" title="设置" class="icon-set"></i>
        </div>
      </div>
      <!--页面 tab -->
      <div class="pageTab">
        <div v-for="page in pages" :class="{item:true,active:page.active}" @mouseup="pageTab_menu($event)"
             oncontextmenu="return false">
          {{ page.label }}
          <i class="icon-close"></i>
        </div>
      </div>
    </div>
    <div class="page">
      <div v-for="(page,key) in pages" :style="{display:page.active}">
        <component :is="page.component"></component>
      </div>
    </div>
    <div class="pageTabMenu">
      <ul>
        <li>
          重新加载
        </li>
        <li>
          关闭标签页
        </li>
        <li>
          关闭其他标签页
        </li>
        <li>
          关闭所有标签页
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, h, Transition, reactive, defineAsyncComponent, shallowRef} from "vue";
import type {XMenuItem, XPageTab} from "@/entity/system/XSupport";
import XMenu from "@/components/XMenu.vue";
import router from '../../router/index';//页面字典
import userMenu from '../../entity/data/menu';
//菜单测试数据


h(Transition, {});
const menuSwitchOpen = ref(true);//菜单展开/收起
const fullScreenStatus = ref(false);//是否全屏

const pages: XPageTab[] = reactive([]);//当前打开页面们
const xMenuData: XMenuItem[] = reactive(userMenu);//测试数据

//Menu > Open page
function menu_Change(item: XMenuItem) {
  window.location.hash = item.name;
  pages.push({label: item.label, component: router[item.name], active: false});
}

//Page tab mouse
function pageTab_menu(e) {
  if (e.button == "2") {
  }
}

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

function pageTest() {

}


onMounted(() => {
  pages.push({label: userMenu[0].label, component: router["home"], active: true});


  //判断当前路由，刷新进入页面，给当前route 对应 Menu Active
  window.onresize = () => {
    //没通过按钮进入全屏状态，更正 fullScreenStatus
    let isFullScreen = !(window.screen.height - window.document.body.offsetHeight > 5)
    fullScreenStatus.value != isFullScreen && (fullScreenStatus.value = isFullScreen)
  }
})

</script>

<style scoped>
</style>
