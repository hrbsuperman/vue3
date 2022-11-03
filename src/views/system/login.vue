<template>
  <div class="less">this is login page</div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
  .less{
    font-size: 2em;
    position: relative;
    &::after{
      position: absolute;
      content: ' ';
      width: 100px;
      height: 100px;
      background-color: aqua;
    }
  }
</style>
