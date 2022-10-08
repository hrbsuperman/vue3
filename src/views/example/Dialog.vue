<template>
    <x-dialog :show="dialogOption.show" :lock="dialogOption.lock">
      测试
    </x-dialog>

  <button @click="Show = !Show">
    dialog show
  </button>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import XDialog from "@/components/XDialog.vue";
const dialogOption = reactive({ show:true,lock:true });

</script>

<style scoped>

</style>
