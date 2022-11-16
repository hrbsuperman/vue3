<template>
  <main class="flex-grid-wrap">
    <div class="flex-grid">
      <span>One column default</span>
    </div>

    <div class="flex-grid">
      <span>Half column 1</span>
      <span>Half column 2</span>
    </div>

    <div class="flex-grid">
      <span>3-col 1</span>
      <span>3-col 2</span>
      <span>3-col 3</span>
    </div>

    <div class="flex-grid">
      <span>4-col 1</span>
      <span>4-col 2</span>
      <span>4-col 3</span>
      <span>4-col 4</span>
    </div>

  </main>
</template>

<script setup lang="ts">
</script>
<style scoped lang="less">
    .flex-grid span{
      min-height: 100px;
      border:2px dashed var(--theme-hover);
      padding:10px
    }
</style>
