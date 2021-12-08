<template>
  <div>
    <back title="立即购买"></back>
    <div class="xs_buy_box">
      <img class="xs_buy_img" :src="$imgUrl + $route.query.img" />
      <div class="xs_buy_name_money">
        <div class="xs_buy_name">{{ $route.query.name }}</div>
        <div class="xs_buy_money">¥ {{ $route.query.money }}</div>
      </div>
    </div>
    <div class="xs_buy_center">
      <div class="xs_center_box">
        <div>课程金额</div>
        <div>¥ {{ $route.query.money }}</div>
      </div>
      <div class="xian"></div>
      <div class="xs_center_box">
        <div>课程数量</div>
        <div>1</div>
      </div>
      <div class="xian"></div>
    </div>
    <div class="xs_buy_bottom">
      <div class='xs_buy_bottom_left'>
        <div class="left_title">合计: </div>
        <div class="left_money">¥ {{ $route.query.money }}</div>
      </div>
      <div class="xs_buy_bottom_right" @click="curPay()">
          立即支付
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import back from "../../components/back/back.vue";
import {CurOrder} from '../../require/api';
export default {
  components: {
    back,
  },
  methods: {
      curPay(){
          CurOrder({id:this.$route.query.id}).then((res)=>{
               Toast(res.msg);
               setTimeout(()=>{
                this.$router.go(-1);
               },1000);
          });
      }
  }
};
</script>

<style lang="less" scoped>
.xs_buy_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem;
  display: flex;
  border-bottom: 0.2rem solid #eee;
}
.xs_buy_img {
  width: 3.6rem;
  height: 2.8rem;
  border-radius: 0.15rem;
}
.xs_buy_name_money {
  margin-left: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.xs_buy_name {
  font-size: 0.4rem;
  font-weight: bold;
}
.xs_buy_money {
  color: red;
  font-size: 0.45rem;
  font-weight: bold;
}
.xs_buy_center {
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 0.4rem;
}
.xs_center_box {
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.4rem;
}
.xs_buy_bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 0 0.4rem;
  height: 1.2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  line-height: 1.2rem;
  display: flex;
}
.xs_buy_bottom_left{
    display: flex;
    width: 50%;
    font-weight: bold;
    .left_title{
        font-size: 0.4rem;
    }
    .left_money{
        font-size: 0.45rem;
        color: red;
        margin-left: 0.4rem;
    }
}
.xs_buy_bottom_right{
    color: white;
    background: black;
    width: 50%;
    text-align: center;
    font-size: 0.4rem;
}
</style>