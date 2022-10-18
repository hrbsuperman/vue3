<script setup lang="ts">
import XIndex from "@/components/XIndex.vue";
import XButton from "@/components/XButton.vue";
import XSelect from "@/components/XSelect.vue";
import XSwitch from "@/components/XSwitch.vue";
import XTest from "@/components/XTest.vue";
import XDatePicker from "@/components/XDatePicker.vue";

import {reactive} from "vue";

const exampleForm = reactive({});

</script>
<template>
  <div class="exampleForm">
    <div class="panel">
      <table>
        <colgroup>
          <col style="width: 300px;"/>
          <col style="width:200px;"/>
          <col/>

        </colgroup>
        <tr>
          <th>input</th>
          <td>
            <input class="x-input" v-model="exampleForm.value"/></td>
          <td> {{ exampleForm.value }}</td>
        </tr>
        <tr>
          <th>x-input</th>
          <td>
            <XIndex placeholder="请输入一些文本" v-model="exampleForm.xvalue"/>
          </td>
          <td> {{ exampleForm.xvalue }}
          </td>
        </tr>
        <tr>
          <th>x-select</th>
          <td>
            <XSelect
                :options="[{text:'item1',value:'item1'},{text:'item2',value:'item2'},{text:'item3',value:'item3'}]"
                value="测试" placeholder="请输入一些文本" v-model="exampleForm.xselect"/>
          </td>
          <td> {{ exampleForm.xselect }}
          </td>
        </tr>
        <tr>
          <th>x-datePicker</th>
          <td>
            <XDatePicker placeholder="请选择日期" v-model="exampleForm.xdatePicker"/>
          </td>
          <td> {{ exampleForm.xdatePicker }}
          </td>
        </tr>
        <tr>
          <th>x-switch</th>
          <td>
            <XSwitch v-model="exampleForm.xswitch"/>
            <XSwitch v-model="exampleForm.xswitch"/>

          </td>
          <td> {{ exampleForm.xswitch }}
          </td>
        </tr>
        <tr>
          <th>x-test</th>
          <td>
            <XTest style="display: inline-block;width:200px;"/>
          </td>
          <td></td>
        </tr>
        <tr>
          <th></th>
          <td colspan="2">{{ exampleForm }}</td>
        </tr>
        <tr>
          <th></th>
          <td colspan="2">
            <XButton @click="exampleForm.input='asdasd'" text="提交"/>
          </td>
        </tr>
      </table>

    </div>
  </div>

</template>
<style scoped lang="less">
table{
  th{
    text-align: right;
  }
  td{
    text-align: left;
  }
  th,td{
    padding:5px;
  }
}
.exampleForm {
  text-align: center;
  padding: 0.75em;

  .panel {
    background-color: #fff;
    padding: 20px;

    & > div {
      padding: 5px;
    }
  }
}
</style>

<style>

</style>
