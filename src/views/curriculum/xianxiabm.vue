<template>
  <div>
    <back title="立即报名"></back>
    <div class="bm_box">
      <img class="bm_img" :src="$imgUrl + img" />
      <div class="bm_name">{{ name }}</div>
    </div>
    <div class="bm_bottom_box">
      <div class="bm_user">上课人</div>
      <div class="xian"></div>
      <div class="bm_user">
        <div>姓名</div>
        <div>{{ params.name }}</div>
      </div>
      <div class="xian"></div>
      <div class="bm_user">
        <div>电话</div>
        <div>{{ params.mobile }}</div>
      </div>
      <div class="xian"></div>
      <div class="bm_user">
        <div>身份证号码</div>
        <div>{{ params.card }}</div>
      </div>
      <div class="xian"></div>
      <div class="bm_msg">提交成功后，将会有人与你联系，请耐心等待！</div>
      <div class="bm_to" @click="sign()">提交</div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import { userInfo, CurSign } from "../../require/api";
import { Dialog, Toast } from "vant";
export default {
  components: {
    back,
  },
  data() {
    return {
      name: this.$route.query.name,
      img: this.$route.query.img,
        params: {
        id: this.$route.query.id,
        name: "",
        mobile: "",
        card: "",
      },
    };
  },
  created() {
    userInfo().then((res) => {
      this.params.name = res.data.name;
      this.params.mobile = res.data.mobile;
      this.params.card = res.data.card;
      if (
        this.params.name == "" ||
        this.params.mobiel == "" ||
        this.params.card == ""
      ) {
        Dialog.confirm({
          title: "提示",
          message: "请先填写用户信息",
        })
          .then(() => {
            this.$router.push({ path: "/my/user" });
          })
          .catch(() => {
            this.$router.go(-1);
          });
      }
    });
  },
  methods: {
    sign() {
      CurSign(this.params).then((res) => {
        Toast(res.msg);
        setTimeout(()=>{
           this.$router.go(-1);
        },1000)
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bm_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem;
  display: flex;
  border-bottom: 0.2rem solid rgb(238, 238, 238);
}
.bm_img {
  width: 3.5rem;
  height: 2.7rem;
  border-radius: 0.15rem;
}
.bm_name {
  font-size: 0.4rem;
  font-weight: bold;
  margin-left: 0.4rem;
}
.bm_bottom_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.4rem;
}
.bm_user {
  width: 100%;
  height: 1.1rem;
  font-size: 0.4rem;
  line-height: 1.1rem;
  display: flex;
  justify-content: space-between;
}
.xian {
  width: 100%;
  background: rgb(238, 238, 238);
  height: 0.01rem;
}
.bm_msg {
  margin-top: 0.4rem;
}
.bm_to {
  width: 100%;
  background: black;
  color: white;
  text-align: center;
  height: 1.1rem;
  line-height: 1.1rem;
  border-radius: 0.6rem;
  font-size: 0.45rem;
  margin-top: 0.6rem;
}
</style>