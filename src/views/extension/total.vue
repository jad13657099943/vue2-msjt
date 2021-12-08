<template>
  <div>
    <back title="人员统计"></back>
    <van-tabs v-model="params.type" color="#ff83ce" @click="setType()">
      <van-tab title="一级成员" title-style='font-size:0.4rem;font-weight:bold' name="1"></van-tab>
      <van-tab title="二级成员" title-style='font-size:0.4rem;font-weight:bold' name="2"></van-tab>
    </van-tabs>

    <div class="total_box" v-if="show">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <div class="box" v-for="item in list" :key="item.id">
          <img :src="item.head_image" />
          <div>{{ item.nickname }}</div>
        </div>
      </van-list>
    </div>
    <user-blank v-if="!show"></user-blank>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import userBlank from "../../components/blank/userBlank.vue";
import { Tab, Tabs, List } from "vant";
import { AgencyTotal } from "../../require/api";
export default {
  components: {
    back,
    vanTab: Tab,
    vanTabs: Tabs,
    userBlank,
    vanList: List,
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
        type: "1",
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
      AgencyTotal(this.params).then((res) => {
        for (let item of res.data.list.data) {
          this.list.push(item);
        }
        this.loading = false;
        if (
          this.list.length >= res.data.total ||
          res.data.list.current_page >= res.data.list.last_page
        ) {
          this.finished = true;
        }
      });
    },
    getList() {
      this.params.page = 1;
      this.finished = false;
      AgencyTotal(this.params).then((res) => {
        this.list = res.data.list.data;
        if (this.list.length > 0) {
          this.show = true;
        } else {
          this.show = false;
        }
        if (
          this.list.length >= res.data.total ||
          res.data.list.current_page >= res.data.list.last_page
        ) {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    setType() {
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>

.<style lang="less" scoped>
.total_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.4rem;
  .box {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    font-size: 0.4rem;
    border-bottom: 0.01rem solid #eee;
    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 0.6rem;
    }
    div {
      margin-left: 0.4rem;
    }
  }
}
</style>