<template>
  <div>
    <back title="佣金明细"></back>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
    </van-list>
    <div class="balance_box" v-if="show">
      <div class="info_box" v-for="item in list" :key="item.id">
        <div>
          <div class="name">{{ item.name }}</div>
          <div class="time">{{ $common.changeTime(item.createtime) }}</div>
        </div>
        <div class="money">{{ item.money }}</div>
      </div>
    </div>
    <balance-blank v-if="!show"></balance-blank>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import balanceBlank from "../../components/blank/balanceBlank.vue";
import { AgencyBalance } from "../../require/api";
import { List } from "vant";
export default {
  components: {
    back,
    balanceBlank,
    vanList: List,
  },
  data() {
    return {
      show: true,
      loading: false,
      finished: false,
      list: [],
      params: {
        page: 1,
        limit: 10,
      },
    };
  },
  methods: {
    onLoad() {
      this.getLoadList();
    },
    getLoadList() {
      if (this.list.length < 1) return (this.loading = false);
      this.params.page += 1;
      AgencyBalance(this.params).then((res) => {
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
      AgencyBalance(this.params).then((res) => {
        this.list = res.data.data;
        if (this.list.length > 0) {
          this.show = true;
        } else {
          this.show = false;
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
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.balance_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.4rem;
}
.info_box {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.4rem 0;
  align-items: center;
  border-bottom: 0.01rem solid #eee;
  .name {
    font-size: 0.4rem;
    font-weight: bold;
  }
  .time {
    color: #999999;
    margin-top: 0.3rem;
  }
  .money {
    font-size: 0.4rem;
    font-weight: bold;
  }
}
</style>