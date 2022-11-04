<template>
  <div class="listPage">
    <div class="header">
      <div style="display: flex;justify-content: flex-start">
        <div style="padding:0 1em;">
          <label>Name：</label>
          <div style="display: inline-block;width: 200px">
            <x-select />
          </div>
        </div>
        <div style="padding:0 1em;">
          <label>Name：</label>
          <div style="display: inline-block;width: 200px">
            <x-select />
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <x-table
        :rowNumber="true"
        :fixedLeftCount="1"
        :fixedRightCount="1"
        :columns="columns"
        :data="data">
        <template v-slot:footer>
          <x-pagination />
        </template>
      </x-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import XTable from "@/components/XTable.vue";
import XPagination from "@/components/XPagination.vue";
import { ref } from "vue";
import XSelect from "@/components/XSelect.vue";

const columns = ref<any>([
  { label: "表头1", bind: "col1", width: 150 },
  { label: "表头2", bind: "col2", width: 150 },
  { label: "表头3", bind: "col3", width: "40%" },
  { label: "表头4", bind: "col4", width: "40%" },
  { label: "操作1", bind: "col5", width: 150 },
  { label: "操作2", bind: "col6", width: 150 }]);

const data = ref<Array<any>>();
let dataTemp = [];
for (let x = 0; x < 20; x++) {
  dataTemp.push({
    col1: "col" + x,
    col2: (new Date()).getTime(),
    col3: (new Date()).getTime(),
    col4: (new Date()).getTime(),
    col5: (new Date()).getTime(),
    col6: (new Date()).getTime()
  });
}
data.value = dataTemp;

</script>
