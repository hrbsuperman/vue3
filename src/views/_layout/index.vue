<template>
  <div :class="menuSwitchOpen?'menuOpen':'menuStow'">
    <div class="menu">
      <div class="logo"
           style="font-weight: 700; color:var(--gray-4);text-align: center;line-height: var(--header-height);">
        Admin
      </div>
      <!--左侧菜单-->
      <x-menu :dataList="xMenuData" :active-item="page.current?.name" @change="menu_Change" />
    </div>
  </div>
  <div class="main">
    <div class="header">
      <div class="control">
        <!--菜单展开/收起-->
        <i class="iconBtn" :class="{'icon-shouqi':true,'rota180':!menuSwitchOpen}" :title="menuSwitchOpen?'收起':'展开'"
           @click="menuSwitchOpen = !menuSwitchOpen"></i>
        <!--面包屑-->
        <div class="breadLink">
          工作台
        </div>
        <!--用户信息&设置-->
        <div class="action">
          <div class="dropdown">
            <i title="通知" class="iconBtn icon-tongzhi"></i>
            <ul class="dropdownBox" style="width: 120px;">
                  <li class="flex flex-center"><i class="icon-usercenter"></i><span>个人信息</span></li>
                  <li class="flex flex-center"><i class="icon-password"></i><span>修改密码</span></li>
                  <li class="flex flex-center"><i class="icon-switch"></i><span>注销</span></li>
            </ul>
          </div>
          <i :title="fullScreenStatus?'退出全屏':'全屏'" class="iconBtn" :class=" fullScreenStatus?'icon-tuichuquanping':'icon-quanping'"
             @click="fullScreen"></i>
          <div class="user dropdown">
            <div class="photo">
              <span class="iconBtn iconfont icon-emoji"></span>
            </div>
            <span>Admin</span>
            <ul class="dropdownBox" style="width: 120px;">
                  <li class="flex flex-center"><i class="icon-usercenter"></i><span>个人信息</span></li>
                  <li class="flex flex-center"><i class="icon-password"></i><span>修改密码</span></li>
                  <li class="flex flex-center"><i class="icon-switch"></i><span>注销</span></li>
            </ul>
          </div>
          <i @click="pageTest" title="设置" class="iconBtn icon-set"></i>
        </div>
      </div>
      <!--页面们的 tab -->
      <div class="pageTab">
        <div tabindex="-1" v-for="(page,i) in pages" :class="{item:true,active:page.active}"
             @mouseup="pageTab_Menu($event,i)"
             @blur="pageTab_Menu_Blur"
             oncontextmenu="return false"
        >
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
    <div class="pageTabMenu" :style="pageTabMenuOption" ref="pageTabMenu">
      <ul>
        <li style="border-bottom:1px solid var(--gray-2)">
          <i class="icon-reload"></i><span>重新加载</span>
        </li>
        <li @click="pageClose(pageTabMenuControlIndex)" :class="{disabled:pageTabMenuControlIndex === 0}">
          <i class="icon-close"></i>关闭标签页
        </li>
        <li @click="pageCloseOther(pageTabMenuControlIndex)">
          <i style="font-weight: 700" class="icon-guanbi"></i>关闭其他标签页
        </li>
        <li @click="pageCloseAll">
          <i class="icon-jianhao"></i>关闭所有标签页
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, h, Transition, reactive, defineAsyncComponent, shallowRef } from "vue";
import type { XMenuItem, XPageTab } from "@/entity/component/XSupport";
import XMenu from "@/components/XMenu.vue";
import router from "../../router/index";//页面字典
import userMenu from "../../entity/data/menu";//菜单测试数据

h(Transition, {});

//测试哪种数据类型适合
const pagesMap: Map<string, XPageTab> = reactive(new Map<string, XPageTab>);
//当前打开页面们
const pages: XPageTab[] = reactive([]);
//当前打开页
const page: any = reactive({ current: null });
//菜单展开/收起
const menuSwitchOpen = ref(true);
//是否全屏
const fullScreenStatus = ref(false);
//页面Tab右键菜单
const pageTabMenuOption = reactive({ display: "none", left: "0px", top: "0px" });
const pageTabMenu = ref<HTMLElement | null>(null);
//右键页面tab索引
const pageTabMenuControlIndex = ref(-1);

//------ 👆 菜单、页面Tab、全屏等非业务功能支持 --------

//测试数据
const xMenuData: XMenuItem[] = reactive(userMenu);
onMounted(() => {
  //默认打开的首页，首页Tab没有关闭通过 main.less > .item { &:first-child{ display:none 控制
  page.current = { name: "home", label: userMenu[0].label, component: router.home, active: true };
  pages.push(page.current);


  //判断当前路由，刷新进入页面，给当前route 对应 Menu Active
  window.onresize = () => {
    //没通过按钮进入全屏状态，更正 fullScreenStatus
    let isFullScreen = !(window.screen.height - window.document.body.offsetHeight > 5);
    fullScreenStatus.value != isFullScreen && (fullScreenStatus.value = isFullScreen);
  };
});

//页面标签，鼠标按下
function pageTab_Menu(e: any, index: number) {
  //左键，切换激活页面
  if (e.button == 0) {
    if (e?.target?.nodeName != "I") {
      if (page.current) page.current.active = false;
      page.current = pages[index];
      page.current.active = true;
    }
  }
  //右键，tab 菜单
  else if (e.button == 2) {
    pageTabMenuControlIndex.value = index;
    window.setTimeout(() => {
      pageTabMenuOption.display = "block";
      pageTabMenuOption.top = e.pageY + "px";
      pageTabMenuOption.left = e.pageX + "px";
    }, 100);
  }
  return false;
}

//页面标签，Blur
//元素设置 tabindex="-1" 属性，可以拥有表单元素的 focus、blur
function pageTab_Menu_Blur() {
  //延迟关闭，让菜单的click顺利触发后再隐藏。
  setTimeout(() => {
    pageTabMenuOption.display = "none";
  }, 180);
}

//关闭其他
function pageCloseOther(current: number) {
  page.current = pages[current];
  page.current.active = true;
  if (current > 1)
    pages.splice(1, current - 1);
  //逻辑是，第一个Page始终不能关闭
  if (pages.length > 2)
    pages.splice(2, pages.length - 2);
}

//关闭全部
function pageCloseAll() {
  page.current = pages[0];
  page.current.active = true;
  pages.splice(1, pages.length - 1);
}

//Page Close
function pageClose(index: number) {
  if (index === 0) return;
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
  console.log("menu_Change");
  //设置地址栏锚点地址
  //window.location.hash = item.name;
  //document.title = item.label;

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
  console.log('router',router)
  if (router[name]) {
    //上一个打开的page，active > false
    if (page.current) page.current.active = false;
    page.current = { name, label, component: router[name], active: true };
    pages.push(page.current);
  } else {
    //404
    console.log(404);
  }
}

function pageTest() {

}
</script>

<style scoped lang="less">
.pageTabMenu {
  position: absolute;
  width: 140px;
  left: 0;
  height: 0;
  z-index: 999;

  ul {
    box-shadow: 0 4px 8px #0003, 0 6px 20px #00000030;
    background-color: #fff;
    padding: 3px 0;
    border-radius: 2px;

    li {
      padding: 0.3em 0.5em;
      font-size: 0.95em;
      color: var(--gray-10);
      cursor: pointer;

      &.disabled {
        background-color: #fff !important;
        cursor: not-allowed;
        color: var(--gray-5);

        i {
          color: var(--gray-5);
        }
      }

      i {
        display: inline-block;
        width: 20px;
      }

      &:hover {
        background-color: var(--gray-2);
      }
    }
  }
}
</style>
