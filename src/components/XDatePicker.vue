<template>
  <div class="x-date-picker" :class="{ active:active }">
    <input class="x-input-clean" @focus="active=true" @blur="xDatePicker_Blur"
           :value="value"
           :placeholder="placeholder"
           :disabled="disabled"/>
    <i class="icon-rili">

    </i>
    <div class="x-date-dialog">
      <div class="control">
        <i class="icon-caret-left"></i>
        <i class="icon-caret-right"></i>
      </div>
      <div class="content">
        <table>
          <thead>
          <tr>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th>周六</th>
            <th>周日</th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps({
  value: {type: String, default: ""},
  format: {type: String, default: "yyyy/MM/dd"},
  placeholder: {type: String, default: ""},
  disabled: {type: Boolean, default: false}
});
const active = ref<boolean>(false);
const months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const dayOfWeek = ["日", "一", "二", "三", "四", "五", "六"];

function xDatePicker_Blur() {
  window.setTimeout(() => {
    active.value = false;
  }, 160)
}
</script>

<style scoped lang="less">
.x-date-picker {
  padding: 0 0.6em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &.active {
    border-color: var(--theme-hover);
    box-shadow: 0 0 3px 0 var(--theme-hover);

    .x-date-dialog {
      display: block;
    }
  }

  i {
    flex-shrink: 1;
    width: 20px;
  }

  .x-date-dialog {
    .control {
      height: 30px;
      display: flex;
      i{
        flex-shrink: 1;
      }

    }
    .control{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 10px;
    }
    .content {
      padding:10px;
      table {
        font-size:11px;
        width: 100%;
        border-collapse: collapse;
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        th,td{
          text-align: center;

              border: 1px solid #DDDDDD;
        }
      }
    }


    z-index: 1001;
    display: none;
    top: 38px;
    left: 0;
    width: 300px;
    height: 240px;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 5px 15px -5px rgb(0 0 0 / 51%);
    border-bottom: 1px solid #BBBBBB;
    border-left: 1px solid #CCCCCC;
    border-right: 1px solid #CCCCCC;
    border-top: 1px solid #CCCCCC;
  }
}
</style>
