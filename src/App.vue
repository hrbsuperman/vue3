<script setup lang="ts">
import {defineAsyncComponent, ref} from "vue";

const pageView = ref<any|null>(null);
  switch (window.location.hash.toLocaleLowerCase()) {
    case "#login":
      pageView.value = defineAsyncComponent(() => import('@/views/system/login.vue'));
      break;
    default:
      pageView.value = defineAsyncComponent(() => import('@/views/_layout/index.vue'));
  }
window.onhashchange = (e)=>{
    //无Layout路由，pageView.value = ***
    //怎么告诉 component 中的 _layout/index.vue
}

</script>
<template>

  <component ref="detail" :is="pageView"></component>
</template>
