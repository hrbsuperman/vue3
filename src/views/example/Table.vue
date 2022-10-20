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
  {label: '表头1', bind: 'col1', width: '30%'},
  {label: '表头2', bind: 'col2'},
  {label: '表头3', bind: 'col3'},
  {label: '操作', bind: 'col4', width: '200px'}]);
const data = ref<Array<any>>();
let dataTemp = [];
for (let x = 0; x < 10; x++) {
  dataTemp.push({
    col1: 'col' + x,
    col2: (new Date()).getTime(),
    col3: (new Date()).getTime(),
    col4: (new Date()).getTime()
  });
}
data.value = dataTemp;

</script>
