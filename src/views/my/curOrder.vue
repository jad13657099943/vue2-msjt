<template>
  <div>
    <back title="我的课程"></back>
    <van-tabs v-model="params.status" color='#ff8cce' @click="setStatus()">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="已付款"></van-tab>
    </van-tabs>
    <cur-black v-if='!show'></cur-black>
    <div class='cur_box' v-if='show'>
        <van-list
          v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
        >
<div class='info' v-for='item in list' :key='item.id'>
    <div class='header'>
        <div>订单编号:{{item.order_no}}</div>
        <div class='red'>{{$project.getCurStatusText(item.status)}}</div>
    </div>
    <div class='xian margin_top'></div>
    <div class='center'>
    <img class='img' :src='$imgUrl+item.info.simages'>
    <div class='right'>
        <div class='right_header'>
            <div class='name'>{{item.info.name}}</div>
            <div class='time'>下单时间:{{$common.changeTime(item.createtime)}}</div>
        </div>
        <div>
         课程价格:¥ {{item.money}}
        </div>
    </div>
    </div>
    <div class='bottom'>
       <div>实付款:</div>
       <div class='pay_money'>¥ {{item.pay_money>0?item.pay_money:0}}</div>
    </div>
    <div class='button_box'>
          <div class='but_hui' v-if="item.status=='1'" @click="cancel(item.id)">取消订单</div>
          <div class='but_red' v-if="item.status=='1'" @click="pay(item.order_no)">立即付款</div>
    </div>
    <div></div>
    <div></div>
</div>
        </van-list>
        
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import curBlack from '../../components/blank/curriculumBlank.vue';
import { Tabs, Tab, List,Dialog, Toast } from "vant";
import { UserCurList,CancelCurOrder } from "../../require/api";
export default {
  components: {
    back,
    vanTabs: Tabs,
    vanTab: Tab,
    vanList: List,
    curBlack
  },
  data() {
    return {
        show:true,
      list: [],
      loading: false,
      finished: false,
      params: {
        limit: 10,
        page: 1,
        status: 0,
      },
    };
  },
  methods: {
      cancel(val){
          Dialog.confirm({
              title:'提示',
              message:'是否取消课程?'
          })
          .then(()=>{
              CancelCurOrder({id:val}).then((res)=>{
                   Toast(res.msg);
                   setTimeout(()=>{
                      this.$router.go(0);
                   },1000);
              });
          })
      },
      pay(){
         Toast('暂不开放');
      },
    setStatus(){
       this.getList();
    },
    onLoad(){
       this.getLoadList();
    },  
    getList() {
      this.params.page = 1;
      this.finished = false;
      UserCurList(this.params).then((res) => {
        this.list = res.data.data;
        if(this.list.length>0){
            this.show=true;
        }else{
            this.show=false;
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
    getLoadList() {
      if (this.list < 1) {
        return (this.loading = false);
      }
      this.params.page += 1;
      UserCurList(this.params).then((res) => {
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
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.cur_box{
    width: 100%;
    min-height: 15rem;
    background: #eee;
    box-sizing: border-box;
    padding: 0.4rem;
    .info{
        background: white;
        box-sizing: border-box;
        padding:0 0.4rem;
        border-radius: 0.15rem;
        margin-bottom: 0.4rem;
       .header{
           display: flex;
           display: -webkit-flex;
           justify-content: space-between;
       }
       .center{
           display: flex;
           display: -webkit-flex;
           box-sizing: border-box;
           padding: 0.4rem 0;
           .img{
               width: 3rem;
               height: 2.5rem;
               border-radius: 0.15rem;
           }
           .right{
               width: 100%;
               display: flex;
               display: -webkit-flex;
               flex-direction: column;
               justify-content: space-between;
               box-sizing: border-box;
               padding: 0 0 0 0.4rem;
               .name{
                   font-size:0.4rem;
                   font-weight: bold;
               }
               .time{
                   color:#999999;
                   margin-top: 0.2rem;
               } 
           }
       }
       .bottom{
           width: 100%;
           box-sizing: border-box;
           padding: 0.4rem 0;
           display: -webkit-flex;
           display: flex;
           justify-content: flex-end;
           line-height: 0.4rem;
           font-size: 0.4rem;
           .pay_money{
               font-weight: bold;
               color: red;
           }
       }
       .button_box{
           width: 100%;
           display: flex;
           display: -webkit-flex;
           justify-content: flex-end;
           box-sizing: border-box;
           padding: 0.4rem 0;
           .but_hui{
               margin-left: 0.2rem;
                border: 0.01rem solid black; 
                padding: 0.05rem 0.25rem;
                border-radius: 0.35rem;
           }
           .but_red{
                margin-left: 0.2rem;
                border: 0.01rem solid red; 
                padding: 0.05rem 0.25rem;
                border-radius: 0.35rem;
                color: red;
           }
       }
    }
}
</style>