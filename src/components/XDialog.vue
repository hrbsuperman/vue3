<template>
  <div class="x-dialog-box lock" v-if="show">
    <div v-if="lock" class="lock"></div>
    <div class="x-dialog">
      <div class="head" @mousedown.self="dragClick($event)">
        <span class="title">{{ title }}</span>
        <div class="buttons">
          <i @click="show=false" class="icon-close"></i>
        </div>
      </div>
      <div class="content">
        <slot/>
      </div>
      <div class="footer">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {type: String, default: ""},
  lock: {type: Boolean, default: false},
  show: {type: Boolean, default: false}

})
let dragElement: any = null;
let dragEL = 0;
let dragET = 0;

function dragClick(e: any) {
  dragElement = e.target.parentElement;
  dragEL = e.clientX - dragElement.offsetLeft;
  dragET = e.clientY - dragElement.offsetTop;
}

function dragClear() {


}

document.onmouseup = (e) => {
  dragElement = null;
}
document.onmousemove = (e) => {
  if (dragElement) {
    dragElement.style.left = numFmt((e.clientX - dragEL)) + 'px';
    dragElement.style.top = numFmt((e.clientY - dragET)) + 'px';
  }
}

function numFmt(num: number) {
  return num < 0 ? 0 : num;
}
</script>

<style lang="less" scoped>
.x-dialog-box {
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;

  .lock {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    background-color: #00000060;
  }
}

.x-dialog {
  z-index: 1001;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  box-shadow: 0 4px 8px #0003, 0 6px 20px #00000030;
  background-color: #fff;
  min-width: 300px;
  border-radius: 4px;

  .head {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    user-select: none;
    border-bottom: 1px solid rgb(var(--gray-3));
    cursor: move;
    display: flex;
    justify-content: space-between;
    padding: 0.5em 1em;
    font-size: 18px;

    i {
      cursor: pointer;
      font-size: 20px;

      &:hover {
        color: #f40;
      }
    }
  }

  .content {
    min-height: 100px;
  }

  .footer {
    text-align: right;
    padding: 0.5em 1em;

    border-top: 1px solid rgb(var(--gray-3));
  }
}
</style>
