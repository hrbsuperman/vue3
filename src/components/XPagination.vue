<template>
  <div class="x-pagination">
    <span class="x-pagination-info">总记录数 {{ total }}  ，第 {{ props.current }} 页，共 {{ pageCount }} 页。</span>

    <div style="width:100%;text-align: right">
      <span v-for="i in 10" class="pageBtn" @click="pageBtn_Click(i)">
        {{ i + pageCurrent - 1 }}
      </span>

    </div>
    <span class="iconBtn">
        <i class="icon-jurassic_home-page "></i>
    </span>
    <span class="iconBtn">
        <i class="icon-jurassic_previous-page "></i>
    </span>
    <input class="x-input-clean x-page-input x-element" />
    <span class="iconBtn">
        <i class="icon-jurassic_next-page"></i>
    </span>
    <span class="iconBtn ">
        <i class="icon-jurassic_end-page"></i>
    </span>
    <span style="width:60px">
            <x-select
              style="height: 24px"
              :clear="false"
              text-bind=""
              value-bind=""
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
const pageCurrent = ref(1);
onMounted(() => {


  pageCount.value = Math.trunc(props.total / props.pageSize) + (props.total % props.pageSize > 0 ? 1 : 0);


});

function pageBtn_Click(change: number) {
  pageCurrent.value += change;
}


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
    border: 1px solid var(--gray-3);
    padding: 0 5px;
    height: 22px;
    text-align: center;
  }

  .pageBtn {
    padding: 2px 5px;
    border: 1px solid var(--gray-3);
    margin: 0 6px;
    cursor: pointer;
    user-select: none;
    border-radius: 2px;

    &:hover {
      border: 1px solid var(--gray-3);
      box-shadow: 0 0 3px 0 var(--gray-5);
    }
  }

  span {
    flex-shrink: 0;

    &.iconBtn {
      cursor: pointer;
      margin: 0 5px;

      i {
        color: var(--gray-7);
        font-size: 12px;
        padding:5px 0;

        &::before {
          border: 1px solid var(--gray-3);
          border-radius: 2px;
          padding: 5px;
        }
          &:hover{
            box-shadow: 0 0 3px 0 var(--gray-5);
          }
      }
    }
  }
}
</style>
