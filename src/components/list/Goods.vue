<template>
  <div class="goods">
    <list
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <div class="list" v-if="show == 1">
        <div class="info" v-for="item in list" :key="item.id">
          <div class="detail" @click="to(item.id)">
            <img class="goods_img" :src="$imgUrl + item.simages" />
            <div class="name">{{ item.name }}</div>
            <div class="money">￥{{ item.configjson[0].shop_price }}</div>
          </div>
        </div>
      </div>
    </list>
    <shop-blank v-if="show == 2"></shop-blank>
  </div>
</template>

<script>
import { goodsList } from "../../require/api";
import shopBlank from "../blank/shopBlank.vue";
import { List } from "vant";

export default {
  name: "Goods",
  props: ["page", "limit", "type_id", "name", "is_recommend_data"],
  components: {
    shopBlank,
    List,
  },
  data() {
    return {
      show: 1,
      loading: false,
      finished: false,
      list: [],
      params: {
        page: this.page,
        limit: this.limit,
        type_id: this.type_id,
        is_recommend_data: this.is_recommend_data,
        name: this.name,
      },
    };
  },
  methods: {
    to(val) {
      this.$router.push({ path: "/shopdetail", query: { id: val } });
    },
    onLoad() {
      if (this.list.length < 1) {
        this.loading = false;
        return;
      }
      this.params.page = parseInt(this.params.page) + 1;
      goodsList(this.params).then((res) => {
        for (let item in res.data.data) {
          this.list.push(res.data.data[item]);
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
       this.finished = false;
      goodsList(this.params).then((res) => {
        this.list = res.data.data;
        if (this.list.length < 1) {
          this.show = 2;
        } else {
          this.show = 1;
        }
        if (res.data.total < 1 || res.data.current_page >= res.data.last_page) {
          this.loading = false;
          this.finished = true;
        }
      });
    },
  },
  created() {
    this.getList();
  },
  watch: {
    page() {
      this.getList();
    },
    limit() {
      this.getList();
    },
    type_id(val) {
      if (val == "") this.params.page = 1;
      this.params.type_id = val;
      this.getList();
    },
    name(val) {
      this.params.name = val;
      this.getList();
    },
  },
};
</script>

<style scoped>
.goods {
  background: #eee;
}
.list {
  padding: 0.3rem 0.3rem 0.06rem 0.3rem;
  display: flex;
  flex-wrap: wrap;
  background: #eee;
}
.info {
  width: 49%;
  padding: 0 0.15rem 0.3rem 0.15rem;
}
.detail {
  width: 100%;
  background: white;
  padding: 0.4rem 0.4rem 0 0.4rem;
  border-radius: 0.2rem;
}
.goods_img {
  width: 100%;
  border-radius: 0.2rem;
}
.name {
  font-size: 0.35rem;
  margin-top: 0.2rem;
}
.money {
  margin-top: 0.2rem;
  color: red; 
  font-weight: bold;
}
</style>