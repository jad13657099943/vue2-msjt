<template>
  <div class="width hui">
    <div class="width header_box">
      <div class="user_info">
        <img class="img" :src="user.head_image" alt="" />

        <div class="user_name">{{ user.nickname }}</div>
        <img @click="toInfo()" class="luosi" src="@/assets/img/螺丝.png" />
      </div>
      <div class="width order">
        <div class="width order_title">
          <div class="order_title_left">全部订单</div>
          <div
            class="order_title_right iconfont icon-jinrujiantou"
            @click="toShopOrder(0)"
          ></div>
        </div>
        <div class="width order_list">
          <div
            class="width"
            v-for="item in orderList"
            :key="item.title"
            @click="toShopOrder(item.type)"
          >
            <img :src="item.img" />
            <div>{{ item.title }}</div>
          </div>
        </div>

        <div class="width lanmu">
          <div
            class="lan"
            v-for="item in lanList"
            :key="item.title"
            @click="toPath(item.path)"
          >
            <img class="lan_img" :src="item.url" />
            <div class="lan_title">{{ item.title }}</div>
            <div class="iconfont icon-jinrujiantou lan_jian"></div>
          </div>
          <div class="lan" @click="kefu()">
            <img class="lan_img" src="@/assets/img/客服.png" />
            <div class="lan_title">客服热线 : {{ this.config[0].value }}</div>
            <div class="iconfont icon-jinrujiantou lan_jian"></div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <bottom path="/my"></bottom>
    </div>
  </div>
</template>

<script>
import bottom from "../components/bottom/Bottom.vue";
import { userInfo, config } from "../require/api";
import { Dialog } from "vant";
export default {
  data() {
    return {
      user: "",
      config: [],
      orderList: [
        { title: "待付款", img: require("../assets/img/order_1.png"), type: 1 },
        { title: "待发货", img: require("../assets/img/order_2.png"), type: 2 },
        { title: "待收货", img: require("../assets/img/order_3.png"), type: 4 },
        {
          title: "退款/售后",
          img: require("../assets/img/order_4.png"),
          type: 5,
        },
      ],
      lanList: [
        {
          title: "我的课程",
          url: require("../assets/img/我的课程.png"),
          path: "/cur/order",
        },
        {
          title: "我的收藏",
          url: require("../assets/img/我的收藏.png"),
          path: "/my/collection",
        },
        {
          title: "VIP会员",
          url: require("../assets/img/会员.png"),
          path: "/my/vip",
        },
        {
          title: "推广中心",
          url: require("../assets/img/推广中心.png"),
          path: "/my/extension/apply",
          paths: "/my/extension/detail",
        },
        {
          title: "收货地址",
          url: require("../assets/img/收货地址.png"),
          path: "/my/site",
        },
        {
          title: "意见反馈",
          url: require("../assets/img/意见反馈.png"),
          path: "/my/message",
        },
      ],
    };
  },
  components: {
    bottom,
  },
  created() {
    userInfo().then((res) => {
      this.user = res.data;
    });
    config({ name: ["客服电话"] }).then((res) => {
      this.config = res.data;
    });
  },
  methods: {
    toInfo() {
      this.$router.push("/my/user");
    },
    toShopOrder(val) {
      if (val < 5)
        this.$router.push({ path: "/my/order", query: { type: val } });
      if (val >= 5) this.$router.push("/my/sale");
    },
    toPath(val) {
      if (val == "/my/extension/apply" && this.user.dai > 1) {
        this.$router.push("/my/extension/detail");
      } else {
        this.$router.push(val);
      }
    },
    kefu() {
      Dialog.confirm({
        title: "提示",
        message: this.config[0].value,
      })
        .then(() => {
          window.location.href = "tel://" + this.config[0].value;
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.hui {
  min-height: 16rem;
  background-color: rgb(248, 248, 248);
}
.header_box {
  background-image: url("../assets/img/my_bg.png");
  height: 4.2rem;
  box-sizing: border-box;
  padding: 0.8rem 0.45rem 1rem 0.45rem;
}
.user_info {
  width: 100%;
  height: 1.6rem;
  display: flex;
}
.img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
}
.user_name {
  line-height: 1.6rem;
  color: white;
  font-size: 0.5rem;
  font-weight: bold;
  margin-left: 0.4rem;
}
.luosi {
  width: 0.6rem;
  height: 0.6rem;
  margin: auto;
  margin-right: 0.2rem;
}
.order {
  margin-top: 0.8rem;
  height: 3rem;
  border-radius: 0.15rem;
  background: white;
}
.order_title {
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: 0.4rem;
}
.order_title_left {
  font-weight: bold;
  margin-left: 0.4rem;
  float: left;
}
.order_title_right {
  float: right;
  margin-right: 0.6rem;
}
.order_list {
  display: flex;
  text-align: center;
}
.order_list img {
  width: 1rem;
}
.lanmu {
  margin-top: 0.8rem;
  border-radius: 0.15rem;
  background: white;
}
.lan {
  width: 100%;
  height: 1.2rem;
  display: flex;
  padding: 0.2rem 0.4rem;
  line-height: 0.8rem;
  font-size: 0.43rem;
}
.lan_img {
  width: 0.7rem;
  height: 0.7rem;
}
.lan_title {
  width: 80%;
  margin-left: 0.4rem;
}
.lan_jian {
  width: 20%;
  text-align: right;
}
</style>