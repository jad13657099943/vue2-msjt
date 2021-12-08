<template>
  <div>
    <div class="car_header">
      <div class="iconfont icon-yemianfanhui return" @click="back"></div>
      <div class="car_title">购物车</div>
      <div class="car_edit" @click="toDel()">{{ header_title }}</div>
    </div>
    <car-blank v-if="show"> </car-blank>
    <div class="car_center" v-if="!show">
      <div class="car_detail_box">
        <vant-check-group v-model="result" ref="checkboxGroup">
          <div v-for="item in list" :key="item.id">
            <div class="car_detail">
              <div class="car_detail_check">
                <vant-check-box
                  :name="item.id"
                  @click="isCheck()"
                ></vant-check-box>
              </div>
              <div class="car_detail_img">
                <img :src="$imgUrl + item.goods.simages" />
              </div>
              <div class="car_detail_content">
                <div class="car_detail_name">{{ item.goods.name }}</div>
                <div class="car_detail_sku">规格: {{ item.sku.name }}</div>
                <div class="car_detail_money_box">
                  <div class="car_detail_money">
                    ¥ {{ sunMoney(item.sku.shop_price, item.num) }}
                  </div>
                  <div><vant-stepper v-model="item.num"></vant-stepper></div>
                </div>
              </div>
            </div>
            <div class="width xian"></div>
          </div>
        </vant-check-group>
      </div>
    </div>
    <div class="car_bottom">
      <div class="car_bottom_left">
        <div class="car_bottom_left_check" @click="checkAll()">
          <vant-check-box v-model="all"> </vant-check-box>
        </div>
        <div class="car_bottom_left_check_title">全选</div>
      </div>
      <div class="car_bottom_center_box">
        <div v-if="!del" class="car_bottom_center_title">不含运费 合计:</div>
        <div v-if="!del" class="car_bottom_center_money">
          ¥ {{ totalMoney() }}
        </div>
      </div>
      <div class="car_bottom_right" @click="make()">{{ bottom_title }}</div>
    </div>
  </div>
</template>

<script>
import { CarLists, CarDel } from "../../require/api";
import carBlank from "../../components/blank/carBlank.vue";
import { Checkbox, CheckboxGroup, Stepper, Dialog, Toast } from "vant";
export default {
  components: {
    carBlank,
    vantCheckBox: Checkbox,
    vantCheckGroup: CheckboxGroup,
    vantStepper: Stepper,
  },
  mounted() {
    window.vue = this;
  },
  data() {
    return {
      result: [],
      all: false,
      show: false,
      header_title: "编辑",
      bottom_title: "去结算",
      del: false,
      list: [],
      params: {
        page: 1,
        limit: 20,
      },
    };
  },
  methods: {
    sunMoney(price, num) {
      return price * num;
    },
    back() {
      this.$router.go(-1);
    },
    totalMoney() {
      let total = 0;
      for (let item of this.list) {
        if (this.$common.inArray(item.id, this.result))
          total += this.sunMoney(item.sku.shop_price, item.num);
      }
      return total;
    },
    checkAll() {
      if (this.all) {
        this.$refs.checkboxGroup.toggleAll();
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
    },
    isCheck() {
      if (this.result.length == this.list.length) {
        this.all = true;
      } else {
        this.all = false;
      }
    },
    toDel() {
      if (this.del) {
        this.header_title = "编辑";
        this.bottom_title = "去结算";
        this.del = false;
      } else {
        this.header_title = "取消";
        this.bottom_title = "删除";
        this.del = true;
      }
    },
    make() {
      if (this.del) {
        Dialog.confirm({
          title: "提示",
          message: "确定要删除选中商品吗?",
        })
          .then(() => {
            CarDel({ ids: this.result }).then((res) => {
              Toast(res.msg);
              setTimeout(() => {
                this.$router.go(0);
              }, 1000);
            });
          })
          .catch(() => {});
      } else {
        if (this.list.length < 1) return Toast("购物车空空如也~");
        if (this.result.length < 1) return Toast("请选择商品");
        let json = [];
        for (let item of this.list) {
          if (this.$common.inArray(item.id, this.result)) {
            json.push({
              img: item.goods.simages,
              title: item.goods.name,
              money: item.sku.shop_price,
              num: item.num,
              id: item.goods.id,
              skuId: item.sku.id,
            });
          }
        }
        let params = {
          data: JSON.stringify(json),
        };
        this.$router.push({ path: "/shopbuydetail", query: params });
      }
    },
  },
  created() {
    CarLists(this.params).then((res) => {
      this.list = res.data.data;
      if (this.list.length < 1) this.show = true;
    });
  },
};
</script>

<style lang="less" scoped>
.car_header {
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  box-sizing: border-box;
  padding: 0 0.4rem;
  display: flex;
  justify-content: space-between;
}
.return {
  font-size: 0.6rem;
}
.car_title {
  font-size: 0.4rem;
  font-weight: bold;
}
.car_edit {
  color: #999999;
}
.car_center {
  width: 100%;
  background: #f8f8f8;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem 0 0.4rem;
  min-height: 100vh;
}
.car_detail_box {
  background: white;
  border-radius: 0.2rem 0.2rem 0 0;
}
.car_detail {
  display: flex;
  width: 100%;
  height: 3.2rem;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem;
}
.car_detail_check {
  height: 100%;
  width: 11%;
  box-sizing: border-box;
  padding: 0.85rem 0rem 0rem 0rem;
}
.car_detail_img {
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  padding: 0rem 0rem 0rem 0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.15rem;
  }
}
.car_detail_content {
  width: 54%;
  height: 100%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .car_detail_name {
    font-size: 0.4rem;
    font-weight: bold;
  }
  .car_detail_sku {
    color: #999999;
  }
  .car_detail_money_box {
    display: flex;
    justify-content: space-between;
    .car_detail_money {
      color: red;
      font-size: 0.4rem;
      font-weight: bold;
      position: relative;
      top: 25%;
    }
  }
}
.xian {
  height: 0.01rem;
  background: rgb(238, 238, 238);
}
.car_bottom {
  width: 100%;
  height: 1.5rem;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: white;
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
}
.car_bottom_left {
  display: flex;
  width: 25%;
  box-sizing: border-box;
  padding: 0.3rem 0.1rem 0 0.1rem;
}
.car_bottom_left_check_title {
  margin-left: 0.3rem;
  font-size: 0.4rem;
}
.car_bottom_center_box {
  width: 48%;
  display: flex;
  box-sizing: border-box;
  padding: 0.35rem 0.3rem 0 0;
  .car_bottom_center_title {
    color: #999999;
    margin-left: auto;
  }
  .car_bottom_center_money {
    font-size: 0.45rem;
    color: red;
    margin-left: 0.3rem;
    font-weight: bold;
  }
}

.car_bottom_right {
  background: #ff8cce;
  color: white;
  width: 27%;
  height: 0.9rem;
  text-align: center;
  line-height: 0.9rem;
  border-radius: 0.5rem;
  margin-top: 0.15rem;
}
</style>