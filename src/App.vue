<script setup lang="ts">
import {defineAsyncComponent} from "vue";

function pageView(): any {
  switch (window.location.hash.toLocaleLowerCase()) {
    case "#login":
      return defineAsyncComponent(() => import('@/views/system/login.vue'));
    default:
      return defineAsyncComponent(() => import('@/views/_layout/index.vue'));
  }
}

</script>

<template>
  <component ref="detail" :is="pageView()"></component>
</template>
