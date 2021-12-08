<template>
  <div>
    <back title="提交订单"></back>
    <div class="buy_detail_box">
      <div class="buy_detail_address">
        <div class="buy_detail_address_left">
          <div class="buy_detail_title_mobile">
            <div class="buy_detail_title" :class="{ bold: this.isRegionNull }">
              {{ this.title }}
            </div>
            <div class="buy_detail_mobile">
              {{ this.mobile }}
            </div>
          </div>
          <div class="buy_detail_msg">{{ this.msg }}</div>
        </div>
        <div
          class="iconfont icon-arrow-right buy_detail_address_right"
          @click="toRegion()"
        ></div>
      </div>
    </div>
    <div class="buy_detail_goods_box">
      <div class="buy_detail_goods_info">
        <div class="info_top" v-for="item in goodsList" :key="item.id">
          <div class="info_top_left">
            <img :src="$imgUrl + item.img" />
          </div>
          <div class="info_top_right">
            <div class="top_right_title_box">
              <div class="box_title">
                {{ item.title }}
              </div>
              <div class="box_titles">
                {{ item.title }}
              </div>
            </div>
            <div class="top_right_money_num">
              <div class="top_right_money">¥ {{ item.money }}</div>
              <div class="top_right_num">x{{ item.num }}</div>
            </div>
          </div>
        </div>
        <div class="info_center_box">
          <div class="info_center"></div>
        </div>

        <div class="info_bottom">
          <div>基础运费</div>
          <div>免运费</div>
        </div>
      </div>
    </div>
    <div class="goods_info_remark_box">
      <div class="goods_info_remark">
        <div class="goods_info_remark_title">订单备注</div>
        <div class="goods_info_remark_content_box">
          <textarea
            v-model="text"
            class="text"
            placeholder="请输入备注信息(选填)"
          >
          </textarea>
        </div>
      </div>
    </div>
    <div class="pay_box">
      <div class="pay_money">
        <div>合计:</div>
        <div class="pay_money_right">¥ {{ payMoney }}</div>
      </div>
      <div class="pay" @click="pay()">支付</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import back from "../components/back/back.vue";
import { regionList, freight, OrderSet } from "../require/api";

export default {
  components: {
    back,
  },
  data() {
    return {
      goodsList: [],
      site: "",
      title: "新增地址",
      msg: "您还没有收货地址哦",
      mobile: "",
      isRegionNull: true,
      man: "",
      sub: "",
      payMoney: "",
      text: "",
    };
  },
  created() {
    this.goodsList = JSON.parse(this.$route.query.data);
    console.log(this.goodsList);
    regionList().then((res) => {
      let data = res.data.data;
      if (data.length > 0) {
        if (this.goodsList[0].regionId) {
          for (let item of data) {
            if (item.id == this.goodsList[0].regionId) {
              this.title = item.name;
              this.mobile = item.mobile;
              this.msg = item.province + item.city + item.region + item.content;
              this.site = this.goodsList[0].regionId;
            }
          }
        } else {
          this.title = data[0].name;
          this.mobile = data[0].mobile;
          this.msg =
            data[0].province + data[0].city + data[0].region + data[0].content;
          this.site = data[0].id;
        }

        this.isRegionNull = false;
      }
    });

    let sum = 0;
    for (let item of this.goodsList) {
      sum += item.money * item.num;
    }
    this.payMoney = sum;

    freight().then((res) => {
      this.man = res.data.mz;
      this.sub = () => {
        if (res.data.sub <= 0 || res.data.sub == "") {
          return "免运费";
        } else {
          return res.data.sub;
        }
      };
      if (res.data.mz > 0 && res.data.sub > 0) {
        if (this.payMoney < res.data.mz) this.payMoney += res.data.sub;
      }
    });
  },
  methods: {
    toRegion() {
      this.$router.replace({
        path: "/shopbuyregion",
        query: { data: JSON.stringify(this.goodsList) },
      });
    },
    pay() {
      let goodsArray = [];
      for (let item of this.goodsList) {
        goodsArray.push({
          goods_id: item.id,
          sku_id: item.skuId,
          num: item.num,
        });
      }
      let data = { goods: goodsArray, site: this.site, remarks: this.text };
      OrderSet(data).then((res) => {
        Toast(res.msg);
      });
    },
  },
};
</script>

<style scoped>
.buy_detail_box {
  background: #eee;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0.4rem;
}
.buy_detail_address {
  width: 100%;
  height: 2.2rem;
  background: white;
  border-radius: 0.15rem;
  display: flex;
  justify-content: space-between;
}

.buy_detail_address_left {
  box-sizing: border-box;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.buy_detail_title_mobile {
  display: flex;
}
.buy_detail_title {
  font-size: 0.4rem;
}
.bold {
  font-weight: bold;
}
.buy_detail_mobile {
  font-size: 0.4rem;
  font-weight: bold;
  margin-left: 0.4rem;
}

.buy_detail_address_right {
  font-size: 0.65rem;
  line-height: 2.2rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
}

.buy_detail_goods_box {
  background: #eee;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 0.4rem 0.4rem 0.4rem;
}

.buy_detail_goods_info {
  width: 100%;
  height: auto;
  background: white;
  border-radius: 0.15rem;
}

.info_top {
  width: 100%;
  display: flex;
}

.info_top_left {
  width: 37%;
  height: 3.2rem;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem 0 0.4rem;
}

.info_top_left > img {
  width: 100%;
  height: 100%;
  border-radius: 0.15rem;
}

.info_top_right {
  width: 63%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem 0 0;
}

.box_title {
  font-size: 0.4rem;
  font-weight: bold;
}

.box_titles {
  margin-top: 0.2rem;
  color: #999999;
}

.top_right_money_num {
  display: flex;
  justify-content: space-between;
}

.top_right_money {
  font-size: 0.45rem;
  color: red;
  font-weight: bold;
}

.top_right_num {
  font-size: 0.4rem;
}

.info_center_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem 0 0.4rem;
}

.info_center {
  width: 100%;
  height: 0.01rem;
  background: #eee;
}

.info_bottom {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem;
  font-size: 0.3rem 0.4rem;
}

.goods_info_remark_box {
  background: #eee;
  width: 100%;
  height: 7rem;
  box-sizing: border-box;
  padding: 0.2rem 0.4rem 0.4rem 0.4rem;
  z-index: 99;
}

.goods_info_remark {
  width: 100%;
  height: 3.6rem;
  background: white;
  border-radius: 0.15rem;
}

.goods_info_remark_title {
  box-sizing: border-box;
  padding: 0.4rem;
  font-size: 0.4rem;
}

.goods_info_remark_content_box {
  box-sizing: border-box;
  padding: 0 0.4rem;
  width: 100%;
  height: 1.9rem;
}

.text {
  border: 0;
  width: 100%;
  height: 1.9rem;
  background-color: #eee;
  border-radius: 0.15rem;
  box-sizing: border-box;
  padding: 0.4rem;
}

.pay_box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.3rem;
  z-index: 100;
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
  display: flex;
  justify-content: space-between;
  background: white;
}

.pay_money {
  font-size: 0.4rem;
  display: flex;
  line-height: 1rem;
}
.pay_money_right {
  color: red;
  font-size: 0.5rem;
  margin-left: 0.2rem;
}

.pay {
  width: 30%;
  height: 0.9rem;
  background: #ff8cce;
  text-align: center;
  line-height: 0.9rem;
  color: white;
  border-radius: 0.45rem;
  font-size: 0.4rem;
}
</style>
