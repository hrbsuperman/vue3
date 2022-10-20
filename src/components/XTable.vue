<template>
  <div class="x-table-box" ref="box">
    <div class="x-table-wrapper" :style="`width:${boxWidth}px;height:${boxHeight}`">
      <div class="x-table-header" ref="header">
        <table class="x-table" :style="`width:${colFullWidth}px`">
          <colgroup>
            <col v-for="c in columnsWidth" :style="`width:${ c || colAvgWidth}px`"/>
            <col style="width: 12px"/>
          </colgroup>
          <thead>
          <tr>
            <th v-for="c in columns"> {{ c.label }}</th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="x-table-body" ref="body" @scroll="body_Scroll($event)">
        <table class="x-table" :style="`width:${colFullWidth}px`">
          <colgroup>
            <col v-for="c in columnsWidth" :style="`width:${ c || colAvgWidth}px`"/>
          </colgroup>
          <tbody>
          <tr v-for="row in data">
            <td v-for="c in columns">
              {{ row[c.bind] }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="x-table-footer">
        footer
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";
import type {XTableColumn} from "@/entity/component/XSupport";

/** 组件属性 **/
const props = defineProps({
  columns: {type: Array<XTableColumn>},
  data: {type: Array<any>},
  rowNumber: {type: Boolean, default: false},

})
/** Ref Element **/
let box = ref<any | null>(null);
let header = ref<any | null>(null);
let body = ref<any | null>(null);
/** const **/
const columnsWidth = ref<Array<number>>([]);
const colAvgWidth = ref<number>(0);
const boxWidth = ref<number>(0);
const boxHeight = ref<number>(0);
const colFullWidth = ref<number>(0);

onMounted(() => {
  //容器宽度
  boxWidth.value = box.value ? box.value.offsetWidth : 0;
  boxHeight.value = box.value ? box.value.offsetHeight : 0;
  let tableColSetWidth: number = 0;//option>columns 设置宽度列合计
  let tableAvgColCount: number = 0;//未设置宽度的列平均宽度
  props.columns && props.columns.map((c) => {
    if (c.width) {
      let colSetWidth = 0;
      if (typeof (c.width) === "number") {
        colSetWidth = c.width;
      } else {
        let unit = c.width.toString().replace(/[0-9]+/g, '');
        switch (unit) {
          case 'px':
            colSetWidth = parseInt(c.width.replace(/px/g, ''));
            break;
          case '%':
            colSetWidth = boxWidth.value * (parseInt(c.width.replace(/%/g, '')) / 100)
            break;
        }
      }
      tableColSetWidth += colSetWidth;
      columnsWidth.value.push(colSetWidth);
    } else {
      tableAvgColCount += 1;
      columnsWidth.value.push(0);
    }
  })
  //未设置宽度的列计算平均宽度  (容器宽度 - 已设置宽度) / 未设置列数
  colAvgWidth.value = boxWidth.value > tableColSetWidth ? (boxWidth.value - tableColSetWidth) / tableAvgColCount : 0;
  //表格完整宽度
  colFullWidth.value = tableColSetWidth + (colAvgWidth.value * tableAvgColCount);
});
let x = 1

function body_Scroll(e: any) {
  header.value.scrollLeft = body.value.scrollLeft;
}
</script>

<style scoped lang="less">
.x-table-box {
  font-size: 14px;
  width: 100%;
  height: 100%;

  .x-table-wrapper {
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    .x-table-border {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      border-left: 1px solid #00000010;
      border-top: 1px solid #00000010;

    }

    .x-table-header {
      overflow-x: hidden;
      overflow-y: hidden;
      flex-shrink: 0;

      .x-table {
        background-color: #f8f8f9;

        th {
        }
      }
    }

    .x-table-body {
      height: 100%;
      overflow: auto;

      tr:hover {
        background-color: #F5F7FA;
      }
    }

    .x-table-footer {
      flex-shrink: 0;
    }

    .x-table {
      table-layout: fixed;
      box-sizing: border-box;
      border-collapse: collapse;

      th, td {
        padding: 8px 5px;
        word-break: break-word;
        background-image: linear-gradient(#e8eaec, #e8eaec), linear-gradient(#e8eaec, #e8eaec);
        background-repeat: no-repeat;
        background-size: 1px 100%, 100% 1px;
        background-position: 100% 0, 100% 100%;
      }
    }
  }
}
</style>
