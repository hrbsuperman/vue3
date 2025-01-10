<template>
  <div class="loginBox">

    <div class="loginMain">
      <div class="logo">
        Logo
      </div>
      <div class="flex" style="height: calc(100% - 100px)">
        <div class="h100" style="height:100%;width:100%;border-right: 3px solid #f5f7fa">

        </div>
        <div class="cus-form" style="width:380px;padding:10em 2em;">
          <div class="cus-input-box">
            <div class="cus-form-item cus-input" style="border-bottom:1px solid #F8FAFB">
              <i class="icon-bussiness-man"></i>
              <div style="padding-left: 1em;" class="w100">
                <label style="padding-left: 5px;">用户名</label>
                <input class="x-input-clean" />
              </div>
            </div>
            <div class="cus-form-item cus-input" style="border-top:1px solid #F8FAFB">
              <i class="icon-unlock"></i>
              <div style="padding-left: 1em;" class="w100">
                <label style="padding-left: 5px;">密码</label>
                <input type="password" class="x-input-clean" />
              </div>
            </div>
          </div>
          <div class="cus-form-item">
            <x-check-box label="记住密码" />
          </div>
          <div class="cus-form-item cus-button">
            <x-button text="登录" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import XCheckBox from "@/components/XCheckBox.vue";
import XButton from "@/components/XButton.vue";
</script>

<style lang="less" scoped>
.loginBox {
  height: 100vh;
  width: 100%;
  position: relative;
  background-image: linear-gradient(90deg, #F6F6F6, #F6F6F6);

  .loginMain {
    position: absolute;
    width: 1040px;
    height: calc(100vh - 180px);
    border-radius: 10px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    background-color: #F8FAFB;

    .logo {
      font-size: 2em;
      color: #0063c1;
      padding: 35px 0 0 50px;

    }

    .cus-form {
      flex-shrink: 0;
      width: 380px;
      padding: 10em 2em;

      .cus-form-item {
        padding: 10px;
        label{
          font-size: 0.8em;
          color:var(--gray-5);
        }
      }

      .cus-input-box {
        background-color: #fff;
        border-radius: 10px;
      }

      .cus-input {
        display: flex;
        align-items: center;

        i {
          flex-shrink: 0;
          font-size: 24px;
        }

        input {
          font-size: 14px;
          padding: 5px;
        }
      }
    }

  }
}
</style>
