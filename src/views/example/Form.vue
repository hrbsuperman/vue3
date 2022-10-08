<script setup lang="ts">
import XIndex from "@/components/XIndex.vue";
import XButton from "@/components/XButton.vue";
import {reactive} from "vue";

const exampleForm = reactive({});

</script>
<template>
  <div class="exampleForm">
    <div class="panel">
      <div>
        <input v-model="exampleForm.value"/>
      </div>
      <div>
        <x-index placeholder="请输入一些文本" v-model="exampleForm.value1"/>
        <p>{{ exampleForm }}</p>

      </div>
      <div>
        <select>
          <option>选项一</option>
          <option>选项一</option>
          <option>选项一</option>
        </select>
      </div>
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

    div {
      padding: 5px;
    }
  }
}
</style>

<style scoped>

</style>
