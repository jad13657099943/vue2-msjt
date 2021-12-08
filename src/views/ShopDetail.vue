<template>
  <div>
    <back title="商品详情"></back>
    <div class="swipe">
      <vant-swipe class="my-swipe" :autoplay="3000">
        <vant-swipe-item v-for="(item, key) in list.fimages" :key="key">
          <img class="width height" v-lazy="$imgUrl + item" />
        </vant-swipe-item>
      </vant-swipe>
    </div>
    <div class="goods_name">
      {{ this.list.name }}
    </div>
    <div class="goods_money_num">
      <div class="goods_money">¥{{ this.list.configjson[0].shop_price }}</div>
      <div class="goods_moneys">¥{{ this.list.configjson[0].user_price }}</div>
      <div class="goods_num">月销{{ this.list.sales_num }}件</div>
    </div>
    <div class="goods_hui"></div>
    <div class="goods_config">
      <div class="goods_config_name">已选: {{ this.showName }}</div>
      <div
        class="iconfont icon-jinrujiantou goods_config_jinru"
        @click="xuan()"
      ></div>
    </div>
    <div class="goods_hui"></div>
    <div class="goods_info">
      <div class="goods_info_title">商品详情</div>
      <div class="goods_info_xian"></div>
      <div class="goods_info_content">{{ this.list.content }}</div>
    </div>

    <div class="goods_bottom">
      <div class="goods_bottom_kefu_box" @click="kefu()">
        <div class="iconfont icon-kefu icon"></div>
        <div class="bold">客服</div>
      </div>
      <div class="goods_bottom_soucang_box" @click="soucang()">
        <div class="iconfont icon" :class="show"></div>
        <div class="bold">收藏</div>
      </div>
      <div class="goods_bottom_gouwuche_box" @click="car()">
        <div class="iconfont icon-gouwuche icon"></div>
        <div class="bold">购物车</div>
      </div>
      <div class="goods_bottom_add_buy_box">
        <div class="goods_bottom_add" @click="addcar()">加入购物车</div>
        <div class="goods_bottom_buy" @click="buy()">立即购买</div>
      </div>
    </div>

    <vantPopup
      v-model="isShow"
      position="bottom"
      closeable
      round
      :style="{ height: 'auto' }"
      close-icon="close"
    >
      <div class="width">
        <div class="goods_config_goods_info">
          <div class="img_box">
            <img class="img" :src="$imgUrl + this.list.simages" />
          </div>
          <div class="goods_config_goods_name_money">
            <div class="goods_config_goods_name">{{ this.list.name }}</div>
            <div class="goods_config_goods_money">¥{{ this.showMoney }}</div>
          </div>
        </div>
        <div class="goods_config_guige">规格</div>
        <div class="goods_config_json_box">
          <div
            @click="toCheck(item.id, item.shop_price, item.name)"
            class="goods_config_json_name"
            :class="check(item.id)"
            v-for="item in this.list.configjson"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="goods_buy_info">
          <div class="goods_buy_title">数量</div>
          <div><vant-stepper vv-model="num"></vant-stepper></div>
        </div>
        <div class="goods_add_car_yes_box">
          <div @click="yes()" class="goods_add_car_yes">确定</div>
        </div>
      </div>
    </vantPopup>
  </div>
</template>

<script>
import Vue from "vue";
import back from "../components/back/back.vue";
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Dialog,
  Toast,
  Popup,
  Stepper,
} from "vant";
import {
  goodsDetail,
  config,
  collectionAdd,
  collectionDel,
  carAdd,
} from "../require/api";
Vue.use(Lazyload);
export default {
  components: {
    back,
    vantSwipe: Swipe,
    vantSwipeItem: SwipeItem,
    vantPopup: Popup,
    vantStepper: Stepper,
  },
  data() {
    return {
      list: [],
      params: { id: this.$route.query.id },
      config: "",
      isShow: false,
      showMoney: "",
      showNmae: "",
      isCheck: "",
      num: 1,
      type: "",
    };
  },

  created() {
    goodsDetail(this.params).then((res) => {
      this.list = res.data;
      this.list.fimages = this.list.fimages.split(",");
      if (this.list.content > 0) {
        this.show == 2;
      } else {
        this.show == 1;
      }
      for (let item of this.list.configjson) {
        this.showMoney = item.shop_price;
        this.isCheck = item.id;
        this.showName = item.name;
        break;
      }
    });
    config({ name: ["客服电话"] }).then((res) => {
      this.config = res.data;
    });
  },
  computed: {
    show() {
      return {
        "icon-shoucang1": this.list.collection > 0,
        "icon-wodeshoucang": this.list.collection < 1,
      };
    },
  },
  methods: {
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
    soucang() {
      if (this.list.collection < 1) {
        collectionAdd({ collection_id: this.params.id, type: 1 }).then(
          (res) => {
            this.list.collection = res.data;
            Toast(res.msg);
          }
        );
      } else {
        collectionDel({ id: this.list.collection }).then((res) => {
          this.list.collection = null;
          Toast(res.msg);
        });
      }
    },
    addcar() {
      this.isShow = true;
      this.type = 1;
    },
    buy() {
      this.isShow = true;
      this.type = 2;
    },
    xuan() {
      this.isShow = true;
      this.type = 3;
    },
    check(val) {
      return {
        goods_config_json_name_check: this.isCheck == val,
      };
    },
    toCheck(id, money, name) {
      this.showMoney = money;
      this.isCheck = id;
      this.showName = name;
    },
    yes() {
      if (this.type == 1) {
        carAdd({
          goods_id: this.params.id,
          num: this.num,
          sku_id: this.isCheck,
        }).then((res) => {
          this.isShow = false;
          Toast(res.msg);
        });
      }
      if (this.type == 2) {
        let json = [
          {
            img: this.list.simages,
            title: this.list.name,
            money: this.showMoney,
            num: this.num,
            id: this.params.id,
            skuId:this.isCheck
          },
        ];
        let params = {
          data: JSON.stringify(json),
        };
        this.$router.push({ path: "/shopbuydetail", query: params });
      }
      if (this.type == 3) {
        this.isShow = false;
      }
    },
    car(){
      this.$router.push({path:'/car',query:{}});
    }
  },
};
</script>

<style  scoped>
.swipe {
  background: rgb(238, 238, 238);
}

.height {
  height: 10rem;
}

.goods_name {
  width: 100%;
  font-size: 0.45rem;
  font-weight: bold;
  font-family: "Microsoft YaHei";
  color: #333333;
  height: 1.4rem;
  line-height: 1.4rem;
  margin-left: 0.5rem;
}

.goods_money_num {
  display: flex;
  height: 1.2rem;
  line-height: 1rem;
  box-sizing: border-box;
  padding: 0 0.5rem;
}

.goods_money {
  font-size: 0.6rem;
  color: red;
  font-weight: bold;
}

.goods_moneys {
  color: rgb(195, 195, 195);
  margin-left: 0.3rem;
  text-decoration: line-through;
}

.goods_num {
  margin-left: auto;
  color: rgb(195, 195, 195);
}

.goods_hui {
  width: 100%;
  background: rgb(238, 238, 238);
  height: 0.2rem;
}

.goods_config {
  width: 100%;
  height: 1.2rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
  display: flex;
  line-height: 1.2rem;
}

.goods_config_name {
  font-size: 0.38rem;
}

.goods_config_jinru {
  margin-left: auto;
  font-size: 0.5rem;
  font-weight: bold;
}

.goods_info {
  width: 100%;
}

.goods_info_title {
  width: 100%;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.35rem;
  letter-spacing: 0.05rem;
}

.goods_info_xian {
  width: 100%;
  height: 0.01rem;
  background: rgb(238, 238, 238);
}

.goods_info_content {
  min-height: 2rem;
}

.goods_bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.3rem;
  display: flex;
  box-sizing: border-box;
  padding: 0 0.25rem;
  text-align: center;
  z-index: 100;
  background: white;
}

.icon {
  font-size: 0.8rem;
}

.bold {
  font-weight: bold;
}

.icon-shoucang1 {
  color: #ff8cce;
}

.goods_bottom_kefu_box {
  width: 12%;
}
.goods_bottom_soucang_box {
  width: 12%;
}
.goods_bottom_gouwuche_box {
  width: 12%;
}
.goods_bottom_add_buy_box {
  width: 64%;
  display: flex;
  box-sizing: border-box;
  padding: 0.2rem 0.2rem;
}
.goods_bottom_add {
  width: 50%;
  border-radius: 0.5rem 0 0 0.5rem;
  background-color: #ff8cce;
  height: 0.9rem;
  line-height: 0.9rem;
  color: white;
  font-size: 0.4rem;
}

.goods_bottom_buy {
  width: 50%;
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: #ff5d5d;
  height: 0.9rem;
  line-height: 0.9rem;
  color: white;
  font-size: 0.4rem;
}

.goods_config_goods_info {
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0.4rem 0.2rem 0 0.4rem;
  display: flex;
}

.img_box {
  width: 28%;
  height: 2.6rem;
}

.img {
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
}
.goods_config_goods_name_money {
  width: 72%;
  height: 2.6rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods_config_goods_name {
  width: 100%;
  font-weight: bold;
  color: black;
  font-size: 0.45rem;
}
.goods_config_goods_money {
  width: 100%;
  font-size: 0.45rem;
  color: red;
  font-weight: bold;
  align-self: flex-end;
}
.goods_config_guige {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
  font-size: 0.4rem;
  font-weight: bold;
}
.goods_config_json_box {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
  display: flex;
  flex-wrap: wrap;
}
.goods_config_json_name {
  border: 0.01rem solid black;
  border-radius: 0.15rem;
  height: 0.65rem;
  line-height: 0.65rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
  margin: 0 0.4rem 0.2rem 0;
}
.goods_config_json_name_check {
  background: #ff8cce;
  color: white;
  border: 0.01rem solid #ff8cce;
}

.goods_buy_info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0.4rem;
}

.goods_buy_title {
  font-size: 0.4rem;
  font-weight: bold;
}

.goods_add_car_yes_box {
  width: 100%;
  height: 2rem;
  box-sizing: border-box;
  padding: 0.6rem 0.4rem 0.4rem 0.4rem;
}

.goods_add_car_yes {
  width: 100%;
  height: 1rem;
  border-radius: 0.5rem;
  background: #ff8cce;
  color: white;
  text-align: center;
  line-height: 1rem;
}
</style>
