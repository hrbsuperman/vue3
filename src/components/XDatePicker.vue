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
            <td v-for="d in w" @click="XDatePickerDay_Click(d)"
                :class="{ today: d?.today,selected:d?.selected, OtherMonth:  d?.month !== XDPMonth }">
              <span>{{ d?.day }}</span>
            </td>
            <!--            (wi===0 && d > 7)||(wi >3 && d<7 )-->
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
//ref input
let XDatePickerInput = ref(null);
//dialog显示状态
const active = ref<boolean>(false);
//dialog显示状态，辅助控制（配合document click）
let activeControl = false;
//content 当前月份、日期
const XDPYear = ref<number>(0);
const XDPMonth = ref<number>(0);
const XDPDay = ref<number>(0);

//content 所有日期集合
const days = reactive<any>([]);
//选中的日期
const dateSelected = ref<any | null>(null);


onMounted(() => {
  let $now = new Date();
  XDPYear.value = $now.getFullYear();
  XDPMonth.value = $now.getMonth();
  XDPDay.value = $now.getDate();

  Init();
});

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
      active.value = false;
      document.removeEventListener('click', DocumentOnceClick)
    }, 10)
  }
  activeControl = false;
}


function Init() {
  let first = new Date(XDPYear.value, XDPMonth.value, 1)
  let last = new Date(XDPYear.value, XDPMonth.value + 1, 0);
  days.splice(0, days.length);
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
      selected: false
    };
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
function XDatePickerDay_Click(date: any) {
  if (dateSelected.value) {
    dateSelected.value.selected = false;
  }
  XDPDay.value = date.day;
  date.selected = true;
  dateSelected.value = date;
  emits('update:modelValue', `${date.year}/${date.month < 9 ? '0' : ''}${date.month + 1}/${date.day < 10 ? '0' : ''}${date.day}`)
}
</script>
<style lang="less" scoped>

/*date-picker*/
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
    cursor: pointer;
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

        .OtherMonth {
          color: rgb(var(--gray-6));
          background-color: #cecece;
        }

        td {
          background-color: #FAFAFA;
          color: #A5A5A5;
          cursor: pointer;

          &:hover {
            border: 1px solid var(--theme-hover);
            border-radius: 5px;
          }
        }

        th, td {
          text-align: center;
          border: 1px solid #DCDCDC;
          user-select: none;
        }

        .today {
          color: var(--theme-hover);

        }

        .selected {
          background-color: var(--theme-hover);
          color: #fff;
        }
      }
    }

    z-index: 1001;
    display: none;
    top: 38px;
    left: -1px;
    width: 300px;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 5px 15px -5px rgb(0 0 0 / 51%);
    border-bottom: 1px solid #BBBBBB;
    border-left: 1px solid #CCCCCC;
    border-right: 1px solid #CCCCCC;
    border-top: 1px solid #CCCCCC;
  }
}

/*date-picker end*/

</style>
