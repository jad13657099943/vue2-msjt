<template>
  <div class="width height">
    <div class="tops"></div>
    <div class="width header top">
      <div class="search width" @click="toSearch()">
        <div class="left">
          <div class="searchs">
            <div class="iconfont icon-sousuo"></div>
            <input type="text" disabled='disabled' placeholder="请输入商品名称" />
          </div>
        </div>
        <div class="right">
          <img class="img" src="@/assets/img/car.png" />
          <div>购物车</div>
        </div>
      </div>
      <div>
        <div class="bar">
          <div class="bars">
            <div
              class="list"
              v-for="item in list"
              :class="{ text: item.id == active }"
              :key="item.id"
              v-on:click="bar(item.id)"
            >
              <div class="name">{{ item.name }}</div>
              <div :class="{ decorations: item.id == active }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="goods">
      <Goods
        :page="params.page"
        :limit="params.limit"
        :type_id="params.type_id"
      ></Goods>
    </div>
    <div>
      <bottom path="/shop"></bottom>
    </div>
  </div>
</template>

<script>
import bottom from "../components/bottom/Bottom";
import Goods from "../components/list/Goods.vue";
import { goods } from "../require/api";

export default {
  components: {
    bottom,
    Goods,
  },
  data() {
    return {
      active: "",
      list: [],
      params: {
        page: 1,
        limit: 8,
        statedata: 1,
        type_id: "",
      },
    };
  },
  methods: {
    bar(val) {
      this.active = val;
      this.params["type_id"] = val;
    },
    toSearch(){
      this.$router.push('/search')
    }
  },
  created() {
    goods({ is_recommend_data: 1 }).then((res) => {
      res.data.unshift({ name: "全部", id: "" });
      this.list = res.data;
    });
  },
};
</script>
<style scoped>
.top {
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  box-sizing: border-box;
  padding: 0.4rem;
}
.tops {
  width: 100%;
  height: 2.8rem;
}
.width {
  width: 100%;
}
.height {
  height: 100%;
}
.header {
  height: 3.2rem;
}
.search {
  height: 1.5rem;
}
.left {
  width: 83%;
  float: left;
  margin-top: 0.1rem;
}
.right {
  width: 17%;
  float: right;
  text-align: center;
  box-sizing: border-box;
  padding-left: 0.15rem;
}
.img {
  width: 35%;
}
.iconfont {
  line-height: 0.8rem;
}

.searchs {
  width: 100%;
  padding: 0 0.4rem;
  box-sizing: border-box;
  height: 0.8rem;
  display: flex;
  background-color: #ededed;
  border-radius: 1rem;
}

.searchs input {
  border: none;
  height: 0.8rem;
  flex: 1;
  background-color: #ededed;
  font-size: 0.32rem;
  margin-left: 0.24rem;
}
.bar {
  width: 100%;
}
.bars {
  width: 100%;
  height: 1rem;
  text-align: center;
  display: -webkit-flex;
  color: #646566;
  font-size: 0.4rem;
}
.list {
  width: 100%;
  height: 100%;
}

.name {
  width: 100%;
  height: 0.6rem;
}
.text {
  color: black;
}
.decorations {
  width: 1.2rem;
  height: 0.08rem;
  background: #ff8cce;
  margin: 0 auto;
  border-radius: 0.5rem;
}
.hui {
  background: #eee;
}
.goods {
  margin-top: 0.5rem;
}
</style>