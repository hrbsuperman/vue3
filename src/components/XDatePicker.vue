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
          <tr v-for="(w,wi) in days">
            <td v-for="d in w" @click="XDatePickerDay_Click(d,wi)"
                :class="{ OtherMonth: (wi===0 && d > 7)||(wi >3 && d<7 )}">
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

// 事件冒泡，最后冒到 document
// dialog区域click给activeControl true
// 冒到 document  activeControl?不缩:缩
function DocumentOnceClick() {
  if (!activeControl) {
    //先maxHeight > 0 opacity > 0 动画 再延时隐藏，
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
  let monthDays = last.getDate();//当月天数
  let weekIndex = 0;//当前日期的周索引
  let dayIndex = first.getUTCDay();//日期在本周的索引
  let day = 1;//日期

  days.push([null, null, null, null, null, null, null]);
  while (day <= monthDays) {
    days[weekIndex][dayIndex] = day;
    day += 1;
    dayIndex += 1;
    if (dayIndex % 7 == 0) {
      days.push([null, null, null, null, null, null, null]);
      dayIndex = 0;
      weekIndex += 1;
    }
  }
  //补全第一周上个月最后几天
  if (days[0][0] == null) {
    let preLastDay = (new Date(XDPYear.value, XDPMonth.value, 0)).getDate();
    let preCalc = 0;
    for (let i = 5; i >= 0; i--) {
      if (days[0][i] == null) {
        days[0][i] = preLastDay - preCalc;
        preCalc += 1;
      }
    }
  }
  //补全最后一周下月前几天
  let lastWeek = days[days.length - 1];
  let x = 1;
  for (let i = 1; i < 7; i++) {
    if (lastWeek[i] == null) {
      lastWeek[i] = x;
      x += 1;
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
function XDatePickerDay_Click(day: number,widx:number) {
  XDPDay.value = day;
  let month = XDPMonth.value + ((widx === 0 && day > 7) ? -1 : (widx > 3 && day <= 7 ? 1 : 0));
  let year = XDPYear.value;
  if(month<0){
    month = 11;
    year -=1;
  }
  if(month>11){
    month = 0;
    year +=1;
  }
  emits('update:modelValue', `${year}/${month + 1}/${day}`)
}
</script>
