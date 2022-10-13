<template>
  <div class="x-date-picker" :class="{ active:active }">
    <input class="x-input-clean" ref="XDatePickerInput" @focus="XDatePicker_Focus" @blur="XDatePicker_Blur"
           :value="modelValue"
           :placeholder="placeholder"
           :disabled="disabled"/>
    <i class="icon-rili">

    </i>
    <div class="x-date-dialog" @click="XDateDialog_Click">
      <div class="control">
        <i @click="Month_Change(-1)" class="icon-caret-left"></i>
        <span style="font-size: 1.2em">{{ XDPMonth + 1 }}</span>
        <span style="font-size: 1.2em">{{ XDPYear }}</span>
        <i @click="Month_Change(1)" class="icon-caret-right"></i>
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
            <td v-for="d in w" @click="XDatePickerDay_Click(d)">
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
  modelValue: {type: String, default: ""},
  format: {type: String, default: "yyyy/MM/dd"},
  placeholder: {type: String, default: ""},
  disabled: {type: Boolean, default: false}
});
let XDatePickerInput = ref(null);
//focus
const active = ref<boolean>(false);
const XDPYear = ref<number>(0);
const XDPMonth = ref<number>(0);
const XDPDay = ref<number>(0);

const emits = defineEmits(['update:modelValue'])
const days = reactive<any>([]);

let activeControl = false;


onMounted(() => {
  let $now = new Date();
  XDPYear.value = $now.getFullYear();
  XDPMonth.value = $now.getMonth();
  XDPDay.value = $now.getDate();

  Init();
});

function XDateDialog_Click() {
  activeControl = true;
}

//事件冒泡，最后冒到 document
// dialog区域click给activeControl true
// 冒到 document  activeControl?不缩:缩
function DocumentOnceClick() {
  console.log('DocumentOnceClick')
  if (!activeControl) {
    window.setTimeout(() => {
      active.value = false;

      document.removeEventListener('click', DocumentOnceClick)
    }, 10)
  }
  activeControl = false;
}


function Init() {

  let first = new Date(XDPYear.value, XDPMonth.value, 1)
  let last = new Date(XDPYear.value, XDPMonth.value + 1, 0);

  days.length = 0;
  let monthDays = last.getDate();
  let weekIndex = 0;//当前日期的周索引
  let dayIndex = first.getUTCDay();//日期在本周的索引
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

//FOCUS
function XDatePicker_Focus() {
  active.value = true;
  activeControl = true;
  document.addEventListener('click', DocumentOnceClick);
}

//BLUR
function XDatePicker_Blur() {

}

//月份 +-
function Month_Change(i: number) {
  let targetMonth = XDPMonth.value + i;
  if (targetMonth > 11) {
    XDPMonth.value = 0;
    XDPYear.value = XDPYear.value + 1;
  } else if (targetMonth < 1) {
    XDPMonth.value = 11;
    XDPYear.value = XDPYear.value - 1;
  } else {
    XDPMonth.value = targetMonth;
  }
  Init();
}

//选定日期
function XDatePickerDay_Click(day: number) {
  XDPDay.value = day;
  emits('update:modelValue', `${XDPYear.value}/${XDPMonth.value+1}/${day}`)
}
</script>

<style scoped lang="less">

</style>
