<template>
  <div>
    <back title="售后"></back>
    <van-tabs v-model="active" color="#ff8cce">
      <van-tab  title="申请售后"> </van-tab>
      <van-tab  title="全部售后"></van-tab>
    </van-tabs>
    <div class='sale_box' v-if='active>0'>
        <div class='sale_info' v-for='item in list' :key='item.id'>
           <div class='header'>
               <div class='order_no'>退款编号:{{item.sale_no}}</div>
               <div class='status_text'>{{$project.getSaleStatusText(item.status)}}</div>
           </div>
           <div class='xian margin_top'></div>
           <div class='center'>
               <div>共{{JSON.parse(item.order_goods_id).length}}件商品 合计:</div>
               <div class='money'>¥ {{item.sale_money}}</div>
           </div>
        </div>
    </div>
    <order-black v-if='active<1'></order-black>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import orderBlack from '../../components/blank/orderBlank.vue';
import { SaleList } from "../../require/api";
import { Tab, Tabs } from "vant";
export default {
  components: { back, vanTab: Tab, vanTabs: Tabs,orderBlack },
  data() {
      return {
          active:0,
          list:[],
          params:{
              limit:10,
              page:1
          }
      }
  },
  created () {
      SaleList(this.params).then((res)=>{
             this.list=res.data.data;
      });
  }
};
</script>

<style lang="less" scoped>
.sale_box{
    width: 100%;
    background: #eee;
    min-height: 16rem;
    box-sizing: border-box;
    padding:0.4rem;
}
.sale_info{
    width: 100%;
    background: white;
    margin-bottom: 0.4rem;
    box-sizing: border-box;
    padding: 0 0.4rem;
    border-radius: 0.15rem;
    .header{
        display: -webkit-flex;
        display: flex;
        justify-content:space-between;
        -webkit-justify-content:space-between;
        .status_text{
            color: red;
        }
    }
    .center{
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        -webkit-justify-content:flex-end;
        font-size: 0.4rem;
        line-height: 0.4rem;
        box-sizing: border-box;
        padding: 0.4rem 0;
       .money{
           color: red;
       } 
    }
    
}
</style>