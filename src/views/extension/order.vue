<template>
  <div>
    <back title="订单记录"></back>
    <van-tabs v-model="params.status" color="#ff83ce" @click="setStatus()">
      <van-tab
        title="进行中"
        title-style="font-size:0.4rem;font-weight:bold"
        name="1"
      >
      </van-tab>
      <van-tab
        title="已完成"
        title-style="font-size:0.4rem;font-weight:bold"
        name="2"
      >
      </van-tab>
    </van-tabs>
    <order-blank v-if="!show"></order-blank>
    <div class="order_box" v-if="show">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <div class="info" v-for="item in list" :key="item.id">
          <div class="header">
            <div>订单编号:{{ item.order_no }}</div>
            <div class="red">{{ getStatus(item.status) }}</div>
          </div>
          <div class="center_top" v-for="items in item.info" :key="items.id">
            <img :src="$imgUrl + items.simages" />
            <div>{{ items.name }}</div>
          </div>
          <div class="center_bottom">
            <div>订单总价:</div>
            <div class="red bold font-size">
              ¥{{ $common.keepTwo(item.money, 2) }}
            </div>
          </div>
          <div class="bottom_top">
            <div>佣金:</div>
            <div class="red bold">¥{{ item.agency }}</div>
          </div>
          <div class="bottom_bottom">
            <div>{{ $common.changeTime(item.createtime) }}</div>

            <div class="bottom_right">
              <img :src="item.user.head_image" />
              <div>{{ item.user.nickname }}</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import orderBlank from '../../components/blank/orderBlank.vue';
import { Tab, Tabs, List } from "vant";
import { AgencyOrder } from "../../require/api";
import OrderBlank from '../../components/blank/orderBlank.vue';
export default {
  components: {
    back,
    vanTab: Tab,
    vanTabs: Tabs,
    vanList: List,
    orderBlank,
    OrderBlank
  },
  data() {
    return {
      loading: false,
      finished: false,
      show: true,
      list: [],
      params: {
        page: 1,
        limit: 10,
        status: "1",
      },
    };
  },
  methods: {
    setStatus() {
      this.getList();
    },
    onLoad() {
      this.getLoadList();
    },
    getStatus(val) {
      let text = "订单异常";
      switch (val) {
        case 1:
          text = "进行中";
          break;
        case 2:
          text = "已完成";
          break;
      }
      return text;
    },
    getLoadList() {
      if (this.length < 1) return (this.loading = false);
      this.params.page += 1;
      AgencyOrder(this.params).then((res) => {
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
    getList() {
      this.params.page = 1;
      this.finished = true;
      AgencyOrder(this.params).then((res) => {
        this.list = res.data.data;
        if (this.list.length > 0) {
          this.show = true;
        } else {
          this.show = false;
        }
        this.loading = false;
        if (
          this.list.length >= res.data.total ||
          res.data.current_page >= res.data.last_page
        ) {
          this.loading = false;
          this.finished = true;
        }
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.order_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem;
  background: #eee;
  .info {
    background: white;
    border-radius: 0.15rem;
    box-sizing: border-box;
    padding: 0.2rem;
    margin-bottom: 0.4rem;
    .header {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      border-bottom: 0.01rem solid #eee;
      padding-bottom: 0.2rem;
    }
    .center_top {
      width: 100%;
      box-sizing: border-box;
      padding: 0.2rem 0 0.4rem 0;
      display: -webkit-flex;
      display: flex;
      img {
        width: 2.6rem;
        height: 2.5rem;
      }
      div {
        font-size: 0.4rem;
        font-weight: bold;
        margin-left: 0.4rem;
      }
    }
    .center_bottom {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      align-items: center;
      height: 1.2rem;
      line-height: 0.8rem;
      border-bottom: 0.01rem solid #eee;
      padding-bottom: 0.4rem;
    }
    .bottom_top {
      display: -webkit-flex;
      display: flex;
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.4rem;
    }
    .bottom_bottom {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      height: 0.6rem;
      line-height: 0.6rem;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        margin-right: 0.2rem;
      }
      .bottom_right {
        display: -webkit-flex;
        display: flex;
      }
    }
  }
}
</style>