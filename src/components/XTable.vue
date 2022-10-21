<template>
  <div class="x-table-box" ref="box">
    <div class="x-table-wrapper" :style="`width:${boxWidth}px;`">
      <div class="x-table-header" ref="header"
           :style="{overflowY: ((body?.scrollHeight||0)>(body?.clientHeight||0))?'scroll':'hidden'}">
        <table class="x-table" :style="`width:${colFullWidth}px`">
          <colgroup>
            <col v-for="c in columnsOption" :style="`width:${ c || colAvgWidth}px`"/>
            <col style="width: 12px"/>
          </colgroup>
          <thead>
          <tr>
            <th v-for="(c,i) in columns" :class="{sticky:c.fixed}" :style="c.fixed">{{ c.label }}</th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="x-table-body" ref="body" @scroll="body_Scroll($event)">
        <table class="x-table" :style="`width:${colFullWidth}px`">
          <colgroup>
            <col v-for="c in columnsOption" :style="`width:${ c || colAvgWidth}px`"/>
          </colgroup>
          <tbody>
          <tr v-for="row in data">
            <td v-for="(c,i) in columns" :class="{sticky:c.fixed}" :style="c.fixed">
              {{ row[c.bind] }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="x-table-footer">
        footer
        <span style="margin-left: 2em">x-table.body.scrollHeight: {{ body?.scrollHeight }} </span>
        <span style="margin-left: 2em">x-table.body.clientHeight: {{ body?.clientHeight }} </span>
        <span style="margin-left: 2em">
        {{ ((body?.scrollHeight || 0) > (body?.clientHeight || 0)) ? 'scroll' : 'hidden' }}
        </span>
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
  fixedLeftCount: {type: Number, default: 0},//左侧固定列数
  fixedRightCount: {type: Number, default: 0},//右侧固定列数
  rowNumber: {type: Boolean, default: false},
})
/** Ref Element **/
let box = ref<any | null>(null);
let header = ref<any | null>(null);
let body = ref<any | null>(null);
/** const **/
const columnsOption = ref<Array<number>>([]);//所有列计算后宽度，未设置宽度为0
const colAvgWidth = ref<number>(0);//未设置宽度列计算平均宽度， 0||avg
const boxWidth = ref<number>(0);//容器宽度
const colFullWidth = ref<number>(0);//设置宽度+avg*avgCount

onMounted(() => {
  //容器宽度
  boxWidth.value = box.value ? box.value.offsetWidth : 0;

  let tableColSetWidth: number = 0;//option>columns 设置宽度列合计
  let tableAvgColCount: number = 0;//未设置宽度的列平均宽度

  props.columns && props.columns.map((c, i) => {
    let colSetWidth = width_Calc(c);//计算列宽度
    if (colSetWidth) {
      //设置了宽度才能开启固定列
      //左侧固定列
      if (i < props.fixedLeftCount) {
        //tableColSetWidth 在计算前正好作为 fixed 列的 left
        c.fixed = `left:${tableColSetWidth}px`;
      }
      //右侧固定列
      if (props.fixedRightCount) {

        let x = (props.columns || []).length - i;
        if (x <= props.fixedRightCount) {
          c.fixed = `right:${(x == 1 ? 0 : width_Calc(props.columns.slice(i + 1)))}px`;
        }
      }
    }
    columnsOption.value.push(colSetWidth);//列宽度
    tableColSetWidth += colSetWidth;//合计设置宽度
    tableAvgColCount += colSetWidth ? 0 : 1;//未设置宽度 Count

  })

  //未设置宽度的列计算平均宽度  (容器宽度 - 已设置宽度) / 未设置列数
  colAvgWidth.value = boxWidth.value > tableColSetWidth ? (boxWidth.value - tableColSetWidth) / tableAvgColCount : 0;
  //表格完整宽度
  colFullWidth.value = tableColSetWidth + (colAvgWidth.value * tableAvgColCount);
});

//宽度计算
function width_Calc(columns: any) {
  let width = 0;
  if (Array.isArray(columns)) {
    if (columns.length) {
      for (let c in columns) {
        width += width_Calc(columns[c]);
      }
    }
  } else {
    if (columns.width) {
      if (typeof (columns.width) === "number") {
        width = columns.width;
      } else {
        let unit = columns.width.toString().replace(/[0-9]+/g, '');
        switch (unit) {
          case 'px':
            width = parseInt(columns.width.replace(/px/g, ''));
            break;
          case '%':
            width = boxWidth.value * (parseInt(columns.width.replace(/%/g, '')) / 100)
            break;
        }
      }
    }
  }
  return width;
}

//横向滚动同步给 t-table-header
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


    .x-table-header {
      overflow-x: hidden;
      overflow-y: hidden;
      flex-shrink: 0;

      .x-table {
        background-color: #f8f8f9; //x-table-body 滚动条上方背景色

        th {
          background-color: #f8f8f9;
        }
      }
    }

    .x-table-body {
      height: 100%;
      overflow-x: auto;
      overflow-y: auto;

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
        z-index: 10;
      }

      td {
        background-color: #fff;
      }

      .fixedLeftLast {
        border-right: 1px solid #000;
      }
    }
  }
}
</style>
