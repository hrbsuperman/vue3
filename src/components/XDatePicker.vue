<template>
  <div class="x-date-picker" :class="{ active:active }">
    <input class="x-input-clean" maxlength="0" @keydown="()=>{return false}"
           @click="XDateDialog_Click" @focus="XDatePicker_Focus" @blur="XDatePicker_Blur"
           :value="modelValue"
           :placeholder="placeholder"
           :disabled="disabled"/>
    <i class="icon-rili"></i>
    <div class="x-date-dialog" @click="XDateDialog_Click">
      <div class="control">
        <div class="ym" :class="{expand:yearOptionsExpand}">
          <div tabindex="-1" @focus="yearSelect_Focus" @blur="delayedClose(0)">{{ XDPYear }}
            年
          </div>
          <ul class="options" ref="yearOptions">
            <li @click="yearOptions_Click(i+1899)" class="option-item" :class="{selected:i === XDPYear-1899}"
                v-for="i in 200">{{ 1899 + i }}
            </li>
          </ul>
        </div>
        <div class="ym" :class="{expand:monthOptionsExpand}">
          <div tabindex="-1" @focus="monthSelect_Focus" @blur="delayedClose(1)">
            {{ XDPMonth + 1 }} 月
          </div>
          <ul class="options" ref="monthOptions">
            <li @click="monthOptions_Click(i)" class="option-item" :class="{selected:i === XDPMonth+1}" v-for="i in 12">
              {{ i }}
            </li>
          </ul>
        </div>
        <span class="w100"></span>
        <span class="btn"><i @click="Month_Change(-1)" class="icon-caret-left"></i></span>
        <span class="btn"><i @click="Month_Change(1)" class="icon-caret-right"></i></span>
      </div>
      <div class="content">
        <table>
          <thead>
          <tr>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
            <th>日</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="w in days">
            <td v-for="d in w" @click="XDatePickerDay_Click(d)"
                :class="{ today: d?.today,selected:d?.selected, 'other-month':  d?.month !== XDPMonth }">
              <span>{{ d?.day }}</span>
            </td>
            <!--(wi===0 && d > 7)||(wi >3 && d<7 )-->
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
const emits = defineEmits(['update:modelValue'])
//ref element
let yearOptions = ref<Element | null>(null);
let monthOptions = ref<Element | null>(null);
//dialog显示状态
const active = ref<boolean>(false);
//dialog 显示状态，document 冒泡前设置true ? document冒泡不收起 dialog && activeControl = false
let activeControl = false;
//content 当前月份、日期
const XDPYear = ref<number>(0);
const XDPMonth = ref<number>(0);
const XDPDay = ref<number>(0);

//年份 select 展开状态
const yearOptionsExpand = ref<boolean>(false);
//月份 select 展开状态
const monthOptionsExpand = ref<boolean>(false);

//content 所有日期集合
const days = reactive<any>([]);
//选中的日期
const dateSelected = ref<any | null>(null);


onMounted(() => {
  XDateReset();
  Init();
});

//年，展开
function yearSelect_Focus() {
  //展开操作，将XDPYear年份滚动到合适的位置
  yearOptionsExpand.value = !yearOptionsExpand.value;
  yearOptions.value && (yearOptions.value.scrollTop = (XDPYear.value - 1900 - 3) * 22);
}
//月，展开
function monthSelect_Focus() {
  monthOptionsExpand.value = !monthOptionsExpand.value;
  monthOptions.value && (monthOptions.value.scrollTop = (XDPMonth.value - 3) * 22);
}
//年，选定
function yearOptions_Click(y: number) {
  XDPYear.value = y;
  Init();
}
//月，选定
function monthOptions_Click(m: number) {
  XDPMonth.value = m - 1;
  Init();
}

//延时关闭，展开select
function delayedClose(type: number) {
  window.setTimeout(() => {
    switch (type) {
      case 0:
        yearOptionsExpand.value = false;
        break;
      case 1:
        monthOptionsExpand.value = false;
        break;
    }
  }, 160);
}

//dialog显示状态，在document click冒泡前告诉他点击了控价区域
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
      XDateReset();
      active.value = false;
      document.removeEventListener('click', DocumentOnceClick)
    }, 10)
  }
  activeControl = false;
}

//日历根据XDPYear、Month初始化
function Init() {
  let first = new Date(XDPYear.value, XDPMonth.value, 1)//第一天
  let last = new Date(XDPYear.value, XDPMonth.value + 1, 0);//最后一天
  days.splice(0, days.length);//清除数组，有个问题，
  let monthDays = last.getDate();//当月天数
  let weekIndex = 0;//当前日期的周索引
  let dayIndex = first.getUTCDay();//日期在本周的索引
  let day = 1;//日期

  days.push([null, null, null, null, null, null, null]);
  while (day <= monthDays) {
    if (dayIndex != 0 && dayIndex % 7 == 0) {
      days.push([null, null, null, null, null, null, null]);
      dayIndex = 0;
      weekIndex += 1;
    }
    days[weekIndex][dayIndex] = {
      year: XDPYear.value,
      month: XDPMonth.value,
      day: day,
      today: day === XDPDay.value,
      //重新渲染，恢复选中状态
      selected: dateSelected.value ? dateSelected.value.year === XDPYear.value && dateSelected.value.month === XDPMonth.value && dateSelected.value.day === day : false
    };
    //重新设置selected对象引用关系
    days[weekIndex][dayIndex].selected && (dateSelected.value = days[weekIndex][dayIndex])
    day += 1;
    dayIndex += 1;
  }
  //补全第一周上个月最后几天
  if (days[0][0] == null) {
    let preLast = (new Date(XDPYear.value, XDPMonth.value, 0));
    let preCalc = 0;
    for (let i = 5; i >= 0; i--) {
      if (days[0][i] == null) {
        days[0][i] = {
          year: preLast.getFullYear(),
          month: preLast.getMonth(),
          day: preLast.getDate() - preCalc
        };
        preCalc += 1;
      }
    }
  }
  //补全最后一周下月前几天
  let lastWeek = days[days.length - 1];
  let x = 1;
  let month = XDPMonth.value + (XDPMonth.value == 11 ? -11 : 1);
  let year = XDPYear.value + (XDPYear.value == 11 ? 1 : 0);
  for (let i = 1; i < 7; i++) {
    if (lastWeek[i] == null) {
      lastWeek[i] = {
        year: year,
        month: month,
        day: x
      };
      x += 1;
    }
  }
}


//FOCUS
function XDatePicker_Focus() {
  if (props.modelValue) {
    let dayArr = props.modelValue.split('/');


    if (props.modelValue.toString().indexOf(`${XDPYear.value}/${XDPMonth.value}`) < 0) {
      if (dayArr.length == 3) {
        XDPYear.value = parseInt(dayArr[0]);
        XDPMonth.value = parseInt(dayArr[1]) - 1;
        XDPDay.value = parseInt(dayArr[2]);


        //XDP，表示当前渲染月份
        //XDP 与 selected 月份不一致重新渲染
        Init();
      }
    }
  }
  active.value = true;
  activeControl = true;
  //document click 冒泡
  document.addEventListener('click', DocumentOnceClick);
}

//BLUR
function XDatePicker_Blur() {

}
//设置当前渲染月份为NOW
function XDateReset() {
  let now = new Date();
  XDPYear.value = now.getFullYear();
  XDPMonth.value = now.getMonth();
  XDPDay.value = now.getDate();
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
function XDatePickerDay_Click(date: any) {
  if (dateSelected.value) {
    dateSelected.value.selected = false;
  }
  XDPDay.value = date.day;
  date.selected = true;
  dateSelected.value = date;
  let value = `${date.year}/${date.month < 9 ? '0' : ''}${date.month + 1}/${date.day < 10 ? '0' : ''}${date.day}`;
  emits('update:modelValue', value)
}
</script>
