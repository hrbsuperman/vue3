<script setup lang="ts">
import XIndex from "@/components/XIndex.vue";
import XButton from "@/components/XButton.vue";
import XSelect from "@/components/XSelect.vue";
import XTest from "@/components/XTest.vue";
import XDatePicker from "@/components/XDatePicker.vue";

import {reactive} from "vue";

const exampleForm = reactive({});

</script>
<template>
  <div class="exampleForm">
    <div class="panel">
      <div>
        input
        <input class="x-input" v-model="exampleForm.value"/>
        {{exampleForm.value}}
      </div>
      <div>
        x-input
        <x-index placeholder="请输入一些文本" v-model="exampleForm.xvalue"/>
        {{exampleForm.xvalue}}
      </div>
      <div>
        x-select
        <x-select :options="[{text:'item1',value:'item1'},{text:'item2',value:'item2'}]" value="测试" placeholder="请输入一些文本" v-model="exampleForm.xselect"/>
        {{exampleForm.xselect}}
      </div>
      <div>
        x-test
        <x-test style="display: inline-block;width:200px;"  />
      </div>
      <div>
        <span>x-datePicker</span>
        <x-date-picker placeholder="请输入一些文本" v-model="exampleForm.xdatePicker"/>
        {{exampleForm.xdatePicker}}
      </div>


      <p>{{ exampleForm }}</p>
      <div>
      </div>
      <div>
        <x-button @click="exampleForm.input='asdasd'" text="提交"/>
      </div>
    </div>
  </div>

</template>
<style scoped lang="less">
.exampleForm {
  text-align: center;
  padding: 20px;

  .panel {
    background-color: #fff;
    padding: 20px;

    &>div {
      padding: 5px;
    }
  }
}
</style>

<style>

</style>
