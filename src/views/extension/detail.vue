<template>
  <div>
    <back title="推广中心"></back>
    <div class="header_box">
      <div class="title">当前收益</div>
      <div class='balance'>{{$common.keepTwo(list.balance,2)}}</div>
      <div class='withdraw'>立即提现</div>
      <div class='money_box'>
       <div>
           <div>全部收益</div>
           <div class='margin_top'>{{list.total}}</div>
       </div>
       <div>
           <div>昨日收益</div>
           <div class='margin_top'>{{list.yesterday}}</div>
        </div>
       <div>
           <div>累计提现</div>
           <div class='margin_top'>{{list.withdraw}}</div>
       </div>
      </div>
    </div>
    <div class='bottom_box'>
        <div class='small_box right_border bottom_border'>
            <img class='img' src='../../assets/img/codema.png' @click="$project.toPath('/my/extension/url')">
            <div>推广名片</div>
        </div>
        <div class='small_box bottom_border' @click="$project.toPath('/my/extension/total')">
             <img class='img' src='../../assets/img/team.png'>
            <div>人员统计</div>
        </div>
        <div class='small_box right_border' @click="$project.toPath('/my/extension/balance')">
             <img class='img' src='../../assets/img/money.png'>
            <div>佣金明细</div>
        </div>
        <div class='small_box'>
             <img class='img' src='../../assets/img/pay.png' @click="$project.toPath('/my/extension/order')">
            <div>订单记录</div>
        </div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import {AgencyCentre} from '../../require/api';
export default {
  components: {
    back,
  },
  data() {
      return {
          list:[]
      }
  },
  created() {
      AgencyCentre().then((res)=>{
           this.list=res.data;
      });
  },
};
</script>

<style lang="less" scoped>
.header_box {
  background: url("../../assets/img/share_bg.png");
  background-repeat: no-repeat;
  background-size: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 1.2rem 0.8rem 0.8rem 0.8rem;
  text-align: center;
  .title{
      font-size: 0.5rem;
      color: white;
  }
  .balance{
      color: white;
      font-size: 0.6rem;
      font-weight: bold;
      box-sizing: border-box;
      padding: 0.4rem 0;
  }
  .withdraw{
      width: 2.4rem;
      height: 0.7rem;
      line-height: 0.7rem;
      margin: 0 auto;
      background: white;
      color: #ff8cce;
      border-radius: 0.35rem;
      font-size: 0.4rem;
  }
  .money_box{
      width: 100%;
      box-sizing: border-box;
      padding: 0.4rem 0 0 0;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      color: white;
      font-size: 0.4rem;
     
  }

}
.bottom_box{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    text-align: center;
     .small_box{
         width: 50%;
         box-sizing: border-box;
         padding: 0.8rem 0 0.4rem 0;
         font-size: 0.4rem;
     }
     .img{
          width: 1rem;
          height: 1rem;
      }
      .right_border{
          border-right: 0.01rem solid #eee;
      }
      .bottom_border{
          border-bottom:0.01rem solid #eee;
      }
}
</style>