<template>
  <div class="home">
    <div class="head">
      <div class="photo">
        <img alt="头像" src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640" style="width: 75px;border-radius: 100%"/>
      </div>
      <div class="textMessage">
        <p style="font-size: 1.2em;color:var(--gray-9);">早安, Admin, 开始您一天的工作吧！</p>
        <p style="color:var(--gray-8)">今日晴，20℃ - 32℃！</p>
      </div>
      <div class="work" :style="{width:works.length* 80+'px'}">
        <div v-for="w in works">
          <div class="desc">{{ w.desc }}</div>
          <div class="number">{{ w.num }}</div>
        </div>

      </div>
    </div>
    <div class="content">
        <div style="height: 200px;background-color: #fff;">

        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const works: Array<any> = reactive([{desc: '待办', num: '2/10'}, {desc: '项目', num: '3'}]);
</script>

<style scoped lang="less">
.home {
  .head {
    background-color: #fff;
    padding: 1.5em;
    display: flex;
    flex-shrink: 0;

    .textMessage {
      width: 100%;
      padding: 0.7em 0 0 2em;
    }

    .work {
      flex-shrink: 0;
      display: flex;
      justify-content: space-between;
      text-align: right;
      margin-top: 10px;
      padding-right: 20px;

      .desc {
        color: var(--gray-6)
      }

      .number {
        font-size: 20px;
      }
    }
  }
  .content{
    padding:1.2em;
  }

}
</style>
