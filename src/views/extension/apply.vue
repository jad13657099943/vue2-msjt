<template>
  <div>
    <back title="申请分销"></back>
    <div class="apply_box">
      <div class="img_box">
        <img class="apply_img" src="../../assets/img/coreJoin_1.png" />
      </div>
      <div class="apply_title">招募合伙人</div>
      <div class="info_box">
          <div class='content_box'>
  <div class='title'>个人信息</div>
        <div class='input_box'>
          <input type="text" v-model="params.name" placeholder="请输入您的姓名" />
        </div>
        <div class='input_box'>
          <input type="number" v-model="params.mobile" placeholder="请输入您的手机号"/>
        </div>
        <div class='sumbit_box' @click="sumbit()">
            提交信息
        </div>
          </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import {ApplyAdd,userInfo} from '../../require/api';
import {Toast} from 'vant';
export default {
  components: { back },
  data() {
      return {
          params:{
            mobile:'',
            name:''
          }
      }
  },
  methods: {
      sumbit(){
           if(this.params.name=='') return Toast('请输入您的姓名');
           if(!this.$common.isMobile(this.params.mobile)) return Toast('请输入正确的手机号');
           ApplyAdd(this.params).then((res)=>{
                Toast(res.msg);
                setTimeout(()=>{
                   this.$router.go(-1);
                },1500);
           });
      }
  },
  created() {
      userInfo().then((res)=>{
        if(res.data.dai>1){
          this.$router.replace('/my/extension/detail');
        }
      });
  },
};
</script>

<style lang="less" scoped>
.apply_box {
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(#ff5d5d, #ff8cb5);
  background-image: -webkit-linear-gradient(#ff5d5d, #ff8cb5);
  .img_box {
    margin: 0 auto;
    width: 6.2rem;
    height: 8rem;
    .apply_img {
      width: 100%;
      height: 100%;
    }
  }
  .apply_title {
    width: 100%;
    font-size: 1.3rem;
    text-align: center;
    color: white;
    font-weight: bold;
    position: absolute;
    top: 4.7rem;
    text-shadow: 0px 6px 6px rgba(130, 32, 0, 0.3);
  }
  .info_box{
     width: 100%;
     box-sizing: border-box;
     padding: 0 0.8rem;
     .content_box{
         background: white;
         width: 100%;
         box-sizing: border-box;
         padding: 0.4rem;
         text-align: center;
         font-size: 0.4rem;
         border-radius: 0.15rem;
         .title{
             box-sizing: border-box;
             padding: 0 0 0.4rem 0;
         }
         .input_box{
             width: 100%;
             height: 1rem;
             background: #ccc;
             border-radius: 0.25rem;
             margin-bottom: 0.4rem;
             input{
                 border: none;
                 width: 100%;
                 height: 100%;
                 background: #ccc;
                 border-radius: 0.25rem;
                 margin-left: 0.1rem;
             }
         }
         .sumbit_box{
             width: 100%;
             background: #ff8cb5;
             height: 1.1rem;
             font-size: 0.43rem;
             color: white;
             border-radius: 0.45rem;
             line-height: 1.1rem;

         }
     }
  }
}
</style>