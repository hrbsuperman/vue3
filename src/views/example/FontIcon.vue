<template>
  <div class="row">
    <div class="col-lg-1 iconBox" v-for="i in icons" @click="copy(i)">
      <i :class="i"></i>
      <p>{{ i }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "Vue";

const icons = ref<Array<string>>([]);

onMounted(() => {

  let iconsTemp: Array<string> = [];
  document.head.childNodes.forEach((item: any, index) => {
    if (item.nodeName == "LINK" && item.href && item.href.indexOf("http://at.alicdn.com") > -1) {
      fetch(item.href).then((response) => {
        response.text().then(css => {
          css.split(/[\r\n]/g).forEach((line, i) => {
            if (i > 5 && line.indexOf(".") > -1 && line.indexOf(":") > 0) {
              iconsTemp.push(line.substring(line.indexOf(".") + 1, line.indexOf(":") - line.indexOf(".")));
            }
          });
          icons.value = iconsTemp;
        });
      });
    }
  });
});


function copy(text: any) {
  let copyElement = document.createElement("input");
  copyElement.style.position = "absolute";
  copyElement.style.top = "-100px";
  copyElement.type = "text";
  copyElement.value = `<i class="${text}"></i>`;
  document.body.appendChild(copyElement);
  copyElement.select();
  document.execCommand("Copy");
  document.body.removeChild(copyElement);
}
</script>

<style scoped lang="less">
.row {
  padding: 1em;

  .iconBox {
    text-align: center;
    height: 12vh;
    cursor: pointer;

    &:hover {
      i, p {

        color: var(--theme-color);
      }
    }

    i {
      font-size: 28px;
    }

    p {
      display: block;
      height: 2em;
      font-size: 12px;
      text-overflow: ellipsis;
      font-weight: 700;
    }
  }
}
</style>
