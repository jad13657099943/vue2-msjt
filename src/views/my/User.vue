<template>
  <div>
    <back title="账号设置"></back>
    <div class="user_box">
      <div class="user_img_box">
        <img class="user_img" :src="list.head_image" />
        <div class="user_name">
          {{ list.nickname }}
        </div>
      </div>
      <div class="user_input_box">
        <div class="user_input_title">手机号</div>
        <input
          v-model="params.mobile"
          type="number"
          class="user_input_input"
          placeholder="请填写"
          :disabled="none"
        />
      </div>
      <div class="xian"></div>
      <div class="user_input_box">
        <div class="user_input_title">真实姓名</div>
        <input
          v-model="params.name"
          type="text"
          class="user_input_input"
          placeholder="请填写"
          :disabled="none"
        />
      </div>
      <div class="xian"></div>
      <div class="user_input_box">
        <div class="user_input_title">身份证号码</div>
        <input
          v-model="params.card"
          type="number"
          class="user_input_input"
          placeholder="请填写"
          :disabled="none"
        />
      </div>
      <div class="xian"></div>
      <div v-if="show" class="set_box" @click="set()">保存</div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import { UserInfo, UserSet } from "../../require/api";
import { Toast } from "vant";
export default {
  components: {
    back,
  },
  data() {
    return {
      none: false,
      list: [],
      show: false,
      params: {
        mobile: "",
        name: "",
        card: "",
      },
    };
  },
  methods: {
    set() {
      if (!this.$utils.isMobile(this.params.mobile))
        return Toast("请输入正确的手机号");
      if (this.params.name == "") return Toast("请输入真实姓名");
      if (!this.$utils.isCard(this.params.card))
        return Toast("请输入正确的身份证");
      UserSet(this.params).then((res) => {
        Toast(res.msg);
        setTimeout(()=>{
            this.$router.go(0);
        })
      });
    },
  },
  created() {
    UserInfo().then((res) => {
      this.list = res.data;
      this.params.mobile = res.data.mobile;
      this.params.name = res.data.name;
      this.params.card = res.data.card;
      if (res.data.mobile!='' && res.data.name!='' && res.data.card!='') {
        this.show = false;
        this.none = false;
      }else{
        this.show = true;
        this.none = false;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.user_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.4rem;
}
.user_img_box {
  width: 100%;
  height: 2.4rem;
  display: flex;
  box-sizing: border-box;
  padding: 0.4rem 0;
  border-bottom: 0.13333rem solid #f8f8f8;
  .user_img {
    width: 1.5rem;
    height: 1.4rem;
    border-radius: 0.8rem;
  }
  .user_name {
    font-size: 0.4rem;
    font-weight: bold;
    line-height: 1.4rem;
    margin-left: 0.4rem;
  }
}
.xian {
  width: 100%;
  background: rgb(238, 238, 238);
  height: 0.01rem;
}

.user_input_box {
  width: 100%;
  height: 1.2rem;
  display: flex;
  box-sizing: border-box;
  padding: 0.2rem 0;
  justify-content: space-between;
  font-size: 0.4rem;
}

.user_input_title {
  line-height: 0.8rem;
}

.user_input_input {
  border: none;
  text-align: right;
  background: white;
}
.set_box {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #ff8cce;
  color: white;
  text-align: center;
  border-radius: 0.5rem;
  font-size: 0.45rem;
  margin-top: 0.8rem;
}
</style>