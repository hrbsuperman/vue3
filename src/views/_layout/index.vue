<template>
  <div :class="menuSwitchOpen?'menuOpen':'menuStow'">
    <div class="menu">
      <div class="logo"
           style="font-weight: 700; color:rgb(var(--gray-4));text-align: center;line-height: var(--header-height);">
        Admin
      </div>
      <!--左侧菜单-->
      <x-menu :dataList="xMenuData" :active-item="page.current?.name" @change="menu_Change"/>
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
      <!--页面们的 tab -->
      <div class="pageTab">
        <div v-for="(page,i) in pages" :class="{item:true,active:page.active}" @click="pageTab_Click($event,i)"
             @mouseup="pageTab_Menu($event)"
             oncontextmenu="return false">
          {{ page.label }}
          <i @click="pageClose(i)" class="icon-close"></i>
        </div>
      </div>
    </div>
    <!--页面们 -->
    <div class="page">
      <div v-for="(page,key) in pages" :class="{box:true, active:page.active}">
        <component :is="page.component"></component>
      </div>
    </div>
    <!--页面标签鼠标右键-->
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
import type {XMenuItem, XPageTab} from "@/entity/component/XSupport";
import XMenu from "@/components/XMenu.vue";
import router from '../../router/index';//页面字典
import userMenu from '../../entity/data/menu';//菜单测试数据

h(Transition, {});

onMounted(() => {
  //默认打开的首页，首页Tab没有关闭通过 main.less > .item { &:first-child{ display:none 控制
  page.current = {name: 'home', label: userMenu[0].label, component: router.home, active: true};
  pages.push(page.current);


  //判断当前路由，刷新进入页面，给当前route 对应 Menu Active
  window.onresize = () => {
    //没通过按钮进入全屏状态，更正 fullScreenStatus
    let isFullScreen = !(window.screen.height - window.document.body.offsetHeight > 5)
    fullScreenStatus.value != isFullScreen && (fullScreenStatus.value = isFullScreen)
  }
})

const pagesMap: Map<string, XPageTab> = reactive(new Map<string, XPageTab>);
//当前打开页面们
const pages: XPageTab[] = reactive([]);
//当前打开页
const page: any = reactive({current: null});
//测试数据
const xMenuData: XMenuItem[] = reactive(userMenu);
//当前激活


//菜单展开/收起
const menuSwitchOpen = ref(true);
//是否全屏
const fullScreenStatus = ref(false);

//Page tab click
function pageTab_Click(e: any, index: number) {
  if (e?.target?.nodeName != "I") {
    if (page.current) page.current.active = false;
    page.current = pages[index];
    page.current.active = true;
  }
}

//Page tab mouse
function pageTab_Menu(e: MouseEvent) {

}

//Page Close
function pageClose(index: number) {
  //如果关闭当前激活页面，把上一索引页面激活，不好使。
  if (page.current == pages[index]) {
    if (page.current) page.current.active = false;
    page.current = pages[index - 1];
    page.current.active = true;
  }
  pages.splice(index, 1);
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


//Menu > Open page
function menu_Change(item: XMenuItem) {
  console.log('menu_Change');
  //设置地址栏锚点地址
  window.location.hash = item.name;
  document.title = item.label;

  //判断当前路由，是否已经打开
  if (!pages.some(p => {
    //找到已经打开的页面对象
    if (p.name == item.name) {
      //当前激活页面不是即将要打开的页面
      if (p.name != page.current.name) {
        //激活目标页面
        if (page.current) page.current.active = false;
        page.current = p;
        page.current.active = true;
      }
      return true;
    } else return false;
  })) {
    pageOpen(item.name, item.label);
  }
}

function pageOpen(name: string, label: string) {

  //跳转不启用layout的路由，需要处理下。
  //...
  if (router[name]) {
    //上一个打开的page，active > false
    if (page.current) page.current.active = false;
    page.current = {name, label, component: router[name], active: true};
    pages.push(page.current);
  } else {
    //404
    console.log(404);
  }

}

function pageTest() {

}


</script>

<style scoped>
</style>
