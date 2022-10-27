<template>
  <div class="x-pagination">
    <span class="x-pagination-info">总记录数 {{ total }}  ，第 {{ props.current }} 页，共 {{ pageCount }} 页。</span>
    <div style="width:100%"></div>
    <span class="iconBtn">
        <i class="icon-jurassic_home-page "></i>
    </span>
    <span class="iconBtn">
        <i class="icon-jurassic_previous-page "></i>
    </span>
    <input class="x-input-clean x-page-input" />
    <span class="iconBtn">
        <i class="icon-jurassic_next-page"></i>
    </span>
    <span class="iconBtn">
        <i class="icon-jurassic_end-page"></i>
    </span>
    <span style="width:50px">
            <x-select
              :clear="false"
              :extendUp=true
              :options="pageSizeList"
              v-model="pageSizeSelected" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import XSelect from "@/components/XSelect.vue";


/** 组件属性 **/
const props = defineProps({
  current: { type: Number, default: 1 },
  total: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  pageSizeList: { type: Array, default: [10, 20, 50, 100] }

});
/* const */
const pageSizeSelected = ref("");
const pageCount = ref(1);
const pageSizeList = ref<Array<any>>([]);
onMounted(() => {

  pageSizeList.value = Array.from(props.pageSizeList, (i) => {
    return { text: i, value: i };
  });
  pageCount.value = Math.trunc(props.total / props.pageSize) + (props.total % props.pageSize > 0 ? 1 : 0);


});


</script>

<style scoped lang="less">
.x-pagination {
  flex-shrink: 0;
  height: 38px;
  line-height: 38px;
  display: flex;
  justify-content: space-between;
  padding: 0 0.75em;
  align-items: center;

  .x-page-input {
    flex-shrink: 0;
    width: 24px;
    border: 1px solid rgb(var(--gray-3));
    padding: 2px 5px;
    height: 20px;
    text-align: center;
  }

  span {
    flex-shrink: 0;

    &.iconBtn {
      cursor: pointer;
      margin: 0 6px;

      i {
        color: rgb(var(--gray-6));
        font-size: 12px;

        &::before {
          background-color: rgb(var(--gray-3));
          border-radius: 2px;
          padding: 5px;
        }
      }
    }
  }
}
</style>
