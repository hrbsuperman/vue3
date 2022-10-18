<template>
  <div class="listPage">
    <div class="header">
      <p>1</p>
      <p>2</p>
    </div>
  </div>
  <div class="content">

  </div>

</template>

<script setup lang="ts">





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
    background-color: #e6e6e6;;
    padding-top: 0.5em;
    height: 100%;
    width: 100%;
    max-width: 100%;
    overflow: auto;
  }
}

</style>
