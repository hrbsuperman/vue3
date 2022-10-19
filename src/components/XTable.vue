<template>
  <div class="x-table-box" ref="box">
    <div class="wrapper" :style="'width:'+boxWidth+'px'">
      <table class="x-table header" :style="'width:'+colFullWidth+'px'">
        <colgroup>
          <col v-for="c in columnsWidth" :style="`width:${ c || colAvgWidth}px`"/>
        </colgroup>
        <thead>
        <tr>
          <th v-for="c in columns"> {{ c.label }}</th>
        </tr>
        </thead>
      </table>

      <table class="x-table bocy" :style="'width:'+colFullWidth+'px'">
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
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";
import type {XTableColumn} from "@/entity/component/XSupport";

/** 组件属性 **/
const props = defineProps({
  columns: {type: Array<XTableColumn>},
  data: {type: Array<any>}
})
/** Ref Element **/
let box = ref<any | null>(null);
/** const **/
const columnsWidth = ref<Array<number>>([]);
const colAvgWidth = ref<number>(0);
const boxWidth = ref<number>(0);
const colFullWidth = ref<number>(0);
onMounted(() => {
  //容器宽度
  boxWidth.value = box.value ? box.value.offsetWidth : 0;
  let tableColSetWidth: number = 0;//option>columns 设置宽度列合计
  let tableAvgColCount: number = 0;//未设置宽度的列平均宽度
  props.columns.map((c) => {
    if (c.width) {
      let colSetWidth = 0;
      if (typeof (c.width) === "number") {
        colSetWidth = c.width;
      } else {
        let unit = c.width.toString().replace(/[0-9]+/g, '');
        switch (unit) {
          case 'px':
            colSetWidth = c.width.replace(/px/g, '');
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
  colAvgWidth.value = boxWidth.value > tableColSetWidth ? (boxWidth.value - tableColSetWidth) / tableAvgColCount : 0;
  console.log('boxWidth', boxWidth.value)
  console.log('tableColSetWidth', tableColSetWidth)
  console.log('colAvgWidth', colAvgWidth.value)
  console.log('tableAvgColCount', tableAvgColCount)

  colFullWidth.value = tableColSetWidth + (colAvgWidth.value * tableAvgColCount);
});
</script>

<style scoped lang="less">
.x-table-box {

  font-size: 14px;
  width: 100%;

  .wrapper {
    box-sizing: border-box;
    overflow: auto;

    .x-table {
      table-layout: fixed;
      box-sizing: border-box;

      th, td {
        padding: 8px 5px;
        word-break: break-word;
        background-image: linear-gradient(#e8eaec, #e8eaec), linear-gradient(#e8eaec, #e8eaec);
        background-repeat: no-repeat;
        background-size: 1px 100%, 100% 1px;
        background-position: 100% 0, 100% 100%;
      }

      &.header {

        background-color: #f8f8f9;

        th {

          padding: 12px 5px;
        }
      }

      &.body {
        tr:hover {
          background-color: #F5F7FA;
        }
      }
    }
  }
}
</style>