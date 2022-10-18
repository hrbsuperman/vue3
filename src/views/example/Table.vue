<template>
  <div class="listPage">
    <div class="header">
      <p>1</p>
      <p>2</p>
    </div>
      <XTable :columns="[{label:'表头1',key:'col1'},{label: '表头2',key:'col2'}]" data-source="[{col1:'测试',col2:'测试'}]"></XTable>
  </div>
</template>

<script setup lang="ts">
import XTable from "@/components/XTable.vue";
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
    padding:10px;
  }

  .content {
    padding-top:0.5em;
    height: 100%;
    width: 100%;
    max-width: 100%;
    overflow: auto;
  }
}

</style>
