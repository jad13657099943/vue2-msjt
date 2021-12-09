
<template>
  <div>
    <back title="我的订单"></back>
    <vant-tabs v-model="params.status" color="#ff8cce" @click="onClick()">
      <van-tab name="0" title-style="font-size:0.4rem" title="全部"></van-tab>
      <van-tab name="1" title-style="font-size:0.4rem" title="待付款"></van-tab>
      <van-tab name="2" title-style="font-size:0.4rem" title="待发货"></van-tab>
      <van-tab name="4" title-style="font-size:0.4rem" title="待收货"></van-tab>
    </vant-tabs>
    <order-blank v-if="!show"></order-blank>
    <div class="order_box" v-if="show">
      <vant-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in list" :key="item.id" class="order_info">
          <div class="order_no_box">
            <div>订单编号:{{ item.order_no }}</div>
            <div>{{ $project.getStatusText(item.status) }}</div>
          </div>
          <div class="xian margin_top"></div>
          <div
            class="order_info_box"
            v-for="items in item.goods"
            :key="items.id"
          >
            <img
              class="order_info_img"
              :src="$imgUrl + JSON.parse(items.info).simages"
            />
            <div class="order_info_right">
              <div class="order_info_right_top">
                <div class="order_info_name">
                  {{ JSON.parse(items.info).name }}
                </div>
                <div class="order_info_sku">
                  {{ JSON.parse(items.sku).name }}
                </div>
              </div>
              <div class="order_info_right_bottom">
                <div class="order_info_right_money">
                  ¥ {{ JSON.parse(items.sku).shop_price }}
                </div>
                <div class="order_info_right_num">x{{ items.num }}</div>
              </div>
            </div>
          </div>
          <div class="order_info_sum_box">
            <div class="order_info_sum_msg">
              共{{ item.goods.length }}件商品 合计:
            </div>
            <div class="order_info_sum_money">¥ {{ item.goods_num }}元</div>
          </div>
          <div class="order_info_button_box">
             <div class="order_info_button" @click="orderDetail(item.id)">
              查看详情
            </div>
            <div
              v-if="item.status == '1'"
              class="order_info_button"
              @click="orderDel(item.id)"
            >
              取消订单
            </div>
           
          </div>
        </div>
      </vant-list>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import OrderBlank from "../../components/blank/orderBlank.vue";
import { Tab, Tabs, List, Dialog, Toast } from "vant";
import { UserOrder, UserDel } from "../../require/api";
export default {
  props: ["type"],
  components: {
    vanTab: Tab,
    back,
    vantTabs: Tabs,
    vantList: List,
    OrderBlank,
  },
  mounted() {
    window.vue = this;
  },
  data() {
    return {
      show: true,
      list: [],
      loading: false,
      finished: false,
      params: {
        limit: 3,
        page: 1,
        status: "",
      },
    };
  },
  methods: {
    orderDel(val) {
      Dialog.confirm({
        title: "提示",
        message: "是否取消订单?",
      }).then(() => {
        UserDel({ id: val }).then((res) => {
          Toast(res.msg);
          setTimeout(() => {
            this.$router.go(0);
          }, 1000);
        });
      });
    },
    orderDetail(val) {
      this.$router.push({ path: "/my/order/detail", query: { id: val } });
    },

    onLoad() {
      this.getLoadList();
    },
    onClick() {
      this.getList();
    },
    getList() {
      this.params.page = 1;
      this.finished = false;
      UserOrder(this.params).then((res) => {
        this.list = res.data.data;
        if (this.list.length < 1) {
          this.show = false;
        } else {
          this.show = true;
        }
        if (
          this.list.length >= res.data.total ||
          res.data.current_page >= res.data.last_page
        ) {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    getLoadList() {
      if (this.list.length < 1) {
        this.loading = false;
        return;
      }
      this.params.page += 1;
      UserOrder(this.params).then((res) => {
        for (let item of res.data.data) {
          this.list.push(item);
        }
        this.loading = false;
        if (
          this.list.length >= res.data.total ||
          res.data.current_page >= res.data.last_page
        ) {
          this.finished = true;
        }
      });
    },
  },
  created() {
    this.params.status = this.$route.query.type;
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.order_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem;
  min-height: 20rem;
  background: #eee;
}
.order_info {
  width: 100%;
  background: white;
  border-radius: 0.15rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
  margin-bottom: 0.4rem;
}
.order_no_box {
  display: flex;
  justify-content: space-between;
}
.order_info_box {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0.4rem 0 0 0;
}
.order_info_img {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.15rem;
}
.order_info_right {
  width: 100%;
  margin-left: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.order_info_right_top {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.order_info_name {
  font-size: 0.4rem;
  font-weight: bold;
}
.order_info_sku {
  color: #999999;
}
.order_info_right_bottom {
  display: flex;
  justify-content: space-between;
}
.order_info_right_money {
  font-size: 0.4rem;
  font-weight: bold;
  color: red;
}
.order_info_right_num {
  color: #999999;
}
.order_info_sum_box {
  display: flex;
  margin-top: 0.4rem;
}
.order_info_sum_msg {
  margin-left: auto;
}
.order_info_sum_money {
  margin-left: 0.2rem;
  font-size: 0.4rem;
  font-weight: bold;
  color: red;
}
.order_info_button_box {
  width: 100%;
  display: flex;
  height: 1.85rem;
  box-sizing: border-box;
  padding: 0.8rem 0 0.4rem 0;
  justify-content: flex-end;
}
.order_info_button {
  height: 0.7rem;
  line-height: 0.7rem;
  border: 0.01rem solid black;
  padding: 0 0.2rem;
  border-radius: 0.3rem;
  margin-right: 0.4rem;
}
</style>