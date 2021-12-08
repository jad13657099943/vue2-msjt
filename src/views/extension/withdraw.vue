<template>
  <div>
    <back title="立即提现"></back>
    <div class="withdraw_box">
      <div class="header">
        <div class="msg">选择提现方式:</div>
        <div class="right">
          <van-radio-group v-model="params.type" direction="horizontal">
            <van-radio name="1" checked-color="#ff8cce">微信</van-radio>
            <van-radio name="2" checked-color="#ff8cce">银行卡</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="center">
        <div class="center_top">
          <div class="name">真实姓名:</div>
          <input
            type="text"
            v-model="params.info.nickname"
            class="input"
            placeholder="请输入真实姓名"
          />
        </div>
        <div class="center_top">
          <div class="name">
            {{ params.type == 1 ? "微信号" : "银行卡号" }}:
          </div>
          <input
            type="text"
            class="input"
            v-model="params.info.card"
            :placeholder="[
              params.type == 1
                ? '请输入要提现到的微信号'
                : '请输入要提现到的银行卡',
            ]"
          />
        </div>
        <div></div>
      </div>
      <div class="bottom">
        <div class="money">提现金额:</div>
        <div class="num_box">
          <div class="rmb">¥</div>
          <input
            type="number"
            v-model="params.money"
            placeholder="请输入提现金额"
          />
        </div>
        <div class="info_box">
          <div>我的余额{{ $common.keepTwo(user.balance, 2) }}元</div>
          <div class="withdraw_title" @click="toNum()">全部提现</div>
        </div>
      </div>
      <div class="submit_box" @click="submit()">
        <div>提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import { RadioGroup, Radio, Toast } from "vant";
import { AgencyCentre, AgencyWithdraw } from "../../require/api";
export default {
  components: {
    back,
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
  },
  data() {
    return {
      user: [],
      params: {
        type: "1",
        money: "",
        info: {
          nickname: "",
          card: "",
        },
      },
    };
  },
  methods: {
    toNum() {
      this.params.money = this.user.balance;
    },
    submit() {
      if (this.params.info.nickname == "") return Toast("请输入真实姓名");
      if (this.params.info.card == "") {
        if (this.params.type == "1") return Toast("请输入微信号");
        if (this.params.type == "2") return Toast("请输入银行卡号");
      }
      if (this.params.money <= 0) return Toast("提现金额必须大于0");
      if (this.params.money > this.user.balance)
        return Toast("提现金额不能大于余额");

      this.params.info = JSON.stringify(this.params.info);
      console.log(this.params);
      AgencyWithdraw(this.params).then((res) => {
        Toast(res.msg);
      });
    },
  },
  created() {
    AgencyCentre().then((res) => {
      this.user = res.data;
    });
  },
};
</script>

<style lang="less" scoped>
.withdraw_box {
  width: 100%;
  background: #eee;
  min-height: 100vh;
  .header {
    display: flex;
    display: -webkit-flex;
    box-sizing: border-box;
    padding: 0.4rem 0;
    background: white;
    border-bottom: 0.3rem solid #eee;
    .msg {
      margin-left: 0.4rem;
      font-size: 0.4rem;
    }
    .right {
      margin-left: 0.6rem;
    }
  }
  .center {
    width: 100%;
    border-bottom: 0.3rem solid #eee;
    background: white;
    .center_top {
      display: -webkit-flex;
      display: flex;
      width: 100%;
      height: 1rem;
      align-items: center;
      .name {
        font-size: 0.4rem;
        margin-left: 0.4rem;
      }
    }
  }
  .input {
    display: flex;
    display: -webkit-flex;
    flex: 1;
    height: 100%;
    border: none;
    text-align: right;
    font-size: 0.45rem;
  }
  .bottom {
    width: 100%;
    background: white;
    .money {
      box-sizing: border-box;
      padding: 0.4rem;
      font-size: 0.4rem;
    }
    .num_box {
      display: -webkit-flex;
      display: flex;
      box-sizing: border-box;
      padding: 0.4rem 0.4rem;
      border-bottom: 0.01rem solid #eee;
      .rmb {
        font-size: 1rem;
        font-weight: bold;
      }
      input {
        border: none;
        margin-left: 0.4rem;
        font-size: 0.4rem;
      }
    }
    .info_box {
      display: flex;
      display: -webkit-flex;
      box-sizing: border-box;
      padding: 0 0.4rem 0.4rem 0.4rem;
      .withdraw_title {
        color: red;
        margin-left: 0.4rem;
      }
    }
  }
  .submit_box {
    width: 100%;
    box-sizing: border-box;
    padding: 0.8rem 0.4rem;
    div {
      background: #ff83ce;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.45rem;

      color: white;
      border-radius: 0.45rem;
    }
  }
}
</style>