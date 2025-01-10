<template>
  <main class="flex-grid-wrap">

    <div class="flex-grid">

      <div>
        <div class="dropdown" >
          <div class="dropdownTitle" style="text-align: center;height: 36px;">Dropdown</div>

          <ul class="dropdownMenu" id="sweets-dropdown" style="width: 120px;">
            <li><a href="javascript:;">下拉区域1</a></li>
            <li><a href="javascript:;">下拉区域2</a></li>
            <li><a href="javascript:;">下拉区域3</a></li>
          </ul>
        </div>
      </div>
      <div>Half column 2</div>
    </div>

  </main>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">

.flex-grid {
  & > div {
    border: 2px dashed var(--theme-color);
    padding: 10px;
    border-radius: 5px;
  }
}
</style>
