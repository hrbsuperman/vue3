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
          <div tabindex="-1" @focus="yearSelect_Focus" @blur="yearOptions_Click(0)">{{ XDPYear }}
            年
          </div>
          <ul class="options" ref="yearOptions">
            <li @click="yearOptions_Click(i+1899)" class="option-item" :class="{selected:i === XDPYear-1899}"
                v-for="i in 200">{{ 1899 + i }}
            </li>
          </ul>
        </div>
        <div class="ym" :class="{expand:monthOptionsExpand}">
          <div tabindex="-1" @focus="monthSelect_Focus" @blur="monthOptions_Click(0)">
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
let yearOptions = ref(null);
let monthOptions = ref<Element | null>(null);
//dialog显示状态
const active = ref<boolean>(false);
//dialog显示状态，辅助控制（配合document click）
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
  //这里需要知道一个，值change后视图更新完的 callback的事件
  setTimeout(() => {
    yearOptions.value.scrollTop = (XDPYear.value - 1900) * 22;

  }, 100)
}

function monthSelect_Focus() {
  //展开操作，将XDPYear年份滚动到合适的位置

  monthOptionsExpand.value = !monthOptionsExpand.value;
  setTimeout(() => {
    monthOptions.value.scrollTop = (XDPMonth.value) * 22;

  }, 100)
}

//年，选定
function yearOptions_Click(y: number) {
  if (y) {
    XDPYear.value = y;
    Init();
  }
  window.setTimeout(() => {
    yearOptionsExpand.value = false;
  }, 100);
}

//月，选定
function monthOptions_Click(m: number) {
  if (m) {
    XDPMonth.value = m - 1;
    Init();
  }
  window.setTimeout(() => {
    monthOptionsExpand.value = false;
  }, 100);
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

function XDateReset() {
  let now = new Date();
  XDPYear.value = now.getFullYear();
  XDPMonth.value = now.getMonth();
  XDPDay.value = now.getDate();
}

//FOCUS
function XDatePicker_Focus() {
  Init();

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
      display: flex;
      height: 50px;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      font-size: 1.1em;

      .btn {
        width: 30px;
        text-align: center;
        flex-shrink: 0;

        i:hover {
          color: var(--theme-hover)
        }
      }

      .ym {
        flex-shrink: 0;
        font-size: 1.2em;
        margin: 0 0.4em;
        padding: 0 0.2em;
        cursor: pointer;
        border-bottom: 2px solid rgb(var(--gray-8));
        position: relative;

        &:hover {
          color: var(--theme-hover);
          border-color: var(--theme-hover);
        }

        &.expand {
          .options {
            display: block;
          }
        }

        .options {
          transition: s;
          position: absolute;
          display: none;
          max-height: 175px;
          overflow: auto;
          top: 34px;
          left: 0;
          width: 100%;
          background-color: #fff;
          border: 1px solid #ccc;
          border-bottom-color: #bbb;
          box-shadow: 0 5px 15px -5px rgb(0 0 0 / 51%);

          li {
            text-align: center;
            font-size: 14px;
            line-height: 22px;
            height: 22px;
            color: rgb(var(--gray-8));

            &:hover {
              color: var(--theme-hover);
              background-color: #F5F5F5;
            }

            &.selected {
              background-color: #E3F4FC !important;
              font-weight: 700;
            }
          }
        }
      }
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

          color: rgb(var(--gray-9));
          height: 24px;
          line-height: 24px;
        }

        .other-month {
          color: rgb(var(--gray-4));
        }

        td:nth-child(1), td:nth-child(2), td:nth-child(3), td:nth-child(4), td:nth-child(5) {
          font-weight: 700;
        }

        td {
          color: rgb(var(--gray-8));
          cursor: pointer;
          overflow: hidden;

          span {
            display: inline-block;
            width: 32px;
            height: 32px;
            line-height: 32px;
            border-radius: 16px;

            &:hover {
              background-color: #F5F5F5;
              color: rgb(var(--gray-8));
              transition: background-color .2s;
            }
          }
        }

        th, td {
          border: 1px solid #fff;
          text-align: center;
          user-select: none;
        }

        .today {
          color: var(--theme-hover);
          font-weight: 700;
        }

        .selected {
          span {
            background-color: #E3F4FC;
            color: rgb(var(--gray-8));
            font-weight: 700;
            transition: background-color .2s;
          }
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
    padding-top: 5px;
    border: 1px solid #ccc;
    border-bottom-color: #bbb;
    box-shadow: 0 5px 15px -5px rgb(0 0 0 / 51%);
  }
}

/*date-picker end*/

</style>
