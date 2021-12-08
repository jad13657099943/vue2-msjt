<template>
 <div>
      <back title='VIP会员'></back>
      <div class='vip_box'>
       <div class='vip_nan'>
        vip特权
       </div>
       <div class='vip_title_box'>
           购物满{{list[0].money}}元将自动升级VIP会员，升级后享受VIP会员价 
       </div>
      </div>
     </div>  
</template>

<script>
import back from '../../components/back/back.vue';
import {UserGrade} from '../../require/api';
export default {
    components:{
        back
    },
    data() {
        return {
            list:[]
        }
    },
    created() {
        UserGrade().then((res)=>{
         this.list=res.data;
        });
    },
}
</script>

<style>
.vip_box{
    width: 100%;
    min-height: 17.5rem;
    background-image: url('../../assets/img/vip_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0;
}
.vip_nan{
    width: 6.5rem;
    height: 1.3rem;
    background-image: url('../../assets/img/vip_nav.png');
     background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0;
    position: absolute;
    top: 12rem;
    left: 1.74rem;
    border-radius: 0.45rem;
    text-align: center;
    line-height: 1.3rem;
    color: white;
    font-size: 0.45rem;
    font-weight: bold;
    z-index: 100;
}
.vip_title_box{
    width: 8.4rem;
    height: 2.4rem;
    background: white;
    position: absolute;
    margin: 0 auto;
    top: 12.6rem;
    left: 0.8rem;
    z-index: 99;
    border-radius: 0.15rem;
    box-sizing: border-box;
    padding: 1rem 0.8rem 0.4rem 0.8rem;
    font-size: 0.4rem;
    font-weight: bold;
}
</style>