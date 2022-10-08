<template>
    <x-dialog title="标题" :show="dialogOption.show" :lock="dialogOption.lock">
      测试
      <template v-slot:footer>
        <button>确认</button>
      </template>
    </x-dialog>

  <button @click="dialogOption.show = !dialogOption.show">
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
