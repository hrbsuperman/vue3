<template>
  <div class="x-date-picker" :class="{ active:active }">
    <input class="x-input-clean" @focus="active=true" @blur="xDatePicker_Blur"
           :value="value"
           :placeholder="placeholder"
           :disabled="disabled"/>
    <i class="icon-rili">

    </i>
    <div class="x-date-dialog" onmousewheel="">
      <div class="control">
        <i class="icon-caret-left"></i>
        <span style="font-size: 1.2em">{{ XDPMonth + 1 }}</span>
        <span style="font-size: 1.2em">{{ XDPYear }}</span>
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
          <tbody>
          <tr v-for="w in days">
            <td v-for="d in w">
              <span>{{ d }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue'

const props = defineProps({
  value: {type: String, default: ""},
  format: {type: String, default: "yyyy/MM/dd"},
  placeholder: {type: String, default: ""},
  disabled: {type: Boolean, default: false}
});
const active = ref<boolean>(false);
const XDPYear = ref<number>(0);
const XDPMonth = ref<number>(0);


let $now = new Date();
XDPYear.value = $now.getFullYear();
XDPMonth.value= $now.getMonth();
const calendar = reactive<any>({first: null, days: null});
calendar.first = new Date(XDPYear.value, XDPMonth.value, 1)
calendar.last = new Date(XDPYear.value, XDPMonth.value + 1, 0);

const days = reactive<any>([]);

onMounted(() => {
  Init();
});

function Init() {
  days.length = 0;
  let monthDays = calendar.last.getDate();
  let weekIndex = 0;//当前日期的周索引
  let dayIndex = $now.getUTCDay();//日期在本周的索引
  let day = 1;//日期

  days.push(['', '', '', '', '', '', '']);
  while (day <= monthDays) {
    days[weekIndex][dayIndex] = day;

    day += 1;
    dayIndex += 1;
    if (dayIndex % 7 == 0) {
      days.push(['', '', '', '', '', '', '']);
      dayIndex = 0;
      weekIndex += 1;
    }
  }
}

//BLUR
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

      i {
        flex-shrink: 1;
      }

    }

    .control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }

    .content {
      padding: 0 10px 10px 10px;

      table {
        font-size: 11px;
        width: 100%;
        border-collapse: collapse;
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        th {
          background-color: #F1F1F1;
          color: #A5A5A5;
          height: 24px;
          line-height: 24px;
        }

        td {
          background-color: #FAFAFA;
          color: #A5A5A5;
          cursor: pointer;

          &:hover {
            background-color: var(--theme-hover);
            color: #fff;
          }
        }

        th, td {
          text-align: center;

          border: 1px solid #DCDCDC;
        }
      }
    }


    z-index: 1001;
    display: none;
    top: 38px;
    left: -1px;
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
