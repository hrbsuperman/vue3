<template>
  <div class="listPage">
    <div class="header">
      <p>1</p>
      <p>2</p>
    </div>
    <div class="content">
      <x-table
          rowNumber="true"
          :columns="columns"
          :data="data"/>

    </div>
  </div>

</template>

<script setup lang="ts">
import XTable from "@/components/XTable.vue";
import {ref} from "vue";

const columns = ref<any>([
  {label: '表头1', bind: 'col1', width: '50%'},
  {label: '表头2', bind: 'col2', width: '50%'},
  {label: '表头3', bind: 'col3', width: '50%'},
  {label: '操作', bind: 'col4', width: '200px'}]);
const data = ref<Array<any>>();
let dataTemp = [];
for (let x = 0; x < 30; x++) {
  dataTemp.push({
    col1: 'col' + x,
    col2: (new Date()).getTime(),
    col3: (new Date()).getTime(),
    col4: (new Date()).getTime()
  });
}
data.value = dataTemp;

</script>

<style lang="less" scoped>
.listPage {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75em;
  box-sizing: border-box;

  .header {
    background-color: #fff;
    padding: 10px;
  }

  .content {
    background-color: #fff;
    margin-top: 0.75em;
    padding: 1em;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

</style>
