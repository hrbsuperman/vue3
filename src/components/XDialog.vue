<template>
  <div class="x-dialog-box lock" v-if="show">
    <div v-if="lock" class="lock"></div>
    <div class="x-dialog" style="transform-origin:-100px 200px">
      <div class="head" @mousedown.self="dragClick($event)" @mouseup.self="dragClear">
        <span class="title">{{ title }}</span>
        <div class="buttons">
          <i @click="show=false" class="icon-close"></i>
        </div>
      </div>
      <div class="content">
        <slot/>
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
  dragElement = null;

}

document.onmousemove = (e) => {
  if (dragElement) {
    dragElement.style.left = (e.clientX - dragEL) + 'px';
    dragElement.style.top = (e.clientY - dragET) + 'px';
  }
}
</script>

<style lang="less" scoped>
.x-dialog-box {
  width: 100%;
  height: 100vh;
  position: fixed;

  .lock {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    background-color: #00000073;
  }
}

.x-dialog {
  z-index: 1001;
  position: absolute;
  border: 1px solid rgb(234, 234, 234);
  box-shadow: rgba(0 0 0 / 40%) 0 0 5px 0;
  min-width: 200px;
  left: calc(50% - 50px);
  top: calc(50vh - 100px);

  .head {
    cursor: move;
    height: 30px;
    display: flex;
    justify-content: space-between;
    padding: 0 1em;
    background-color: rgb(var(--gray-4));

    i {
      cursor: pointer;

      &:hover {
        color: #f40;
      }
    }
  }

  .content {
    min-height: 100px;
    background-color: #fff;
  }
}
</style>
