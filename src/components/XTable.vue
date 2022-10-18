<template>
  <div class="table-container x-scroll">
    <div class="slider-box">
      <div class="slider" @mousedown.self="dragClick($event)"></div>
    </div>
    <table style="" class="fixTableHead" cellpadding="1" cellspacing="1">
      <thead>
      <tr>
        <th v-for="c in 10">column{{ c }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in 50">
        <td v-for="c in 10">{{ c }}{{ i }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>


let dragElement: any = null;
let dragET = 0;

function dragClick(e: any) {
  dragElement = e.target.parentElement;
  dragET = e.clientY - dragElement.offsetTop;
}

document.onmouseup = (e) =>{
    dragElement = null;
}
document.onmousemove = (e) => {
  if (dragElement) {
    dragElement.style.top = (e.clientY - dragET) + 'px';
  }
}

</script>

<style scoped lang="less">
.x-scroll{
  overflow: hidden;
  position: relative;
  .slider-box{
    position: absolute;
    height: 100%;
    width: 12px;
    background-color: #fff;
    right: 0;
    top:0;
    .slider{
      height: 100px;
      background-color: #0063c1;
      width: 12px;
      cursor: pointer;
    }
  }

}
.table-container {
  width: 100%;
  height: 100%;

  table {
    width: 100%;
    background-color: #0C2135;
  }

}

td, th {
  padding: 8px 15px;
}

th {
  background: #ABDD93;
}

td {
  background-color: #fff;
}

/* 首列固定 */
.table-container thead tr > th:first-child,
.table-container tbody tr > td:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
}

/* 表头固定 */
.table-container thead tr > th {
  position: sticky;
  top: 0;
  z-index: 2;
}

/* 表头首列强制最顶层 */
.table-container thead tr > th:first-child {
  z-index: 3;
}
</style>
