<template>
  <div>
      <div class="img_div">
 <img class='img' src="@/assets/img/none_address.png">
      </div>
     <div class="msg">
         暂时没有收货地址哦~
     </div>
     <div class='add_region' @click="add()">
     添加地址
     </div>
  </div>
</template>

<script>
export default {
   methods: {
       add(){
           this.$router.push('/region');
       }
   }
}
</script>

<style scoped>
.img_div{
    width: 40%;
    margin: 0 auto;
    margin-top: 2rem;
}
.img{
    width: 100%;
}
.msg{
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.4rem; 
}
.add_region{
    width: 3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.4rem auto;
    background: #ff8cce;
    color: white;
    border-radius: 0.36rem;
    text-align: center;
    font-size: 0.4rem;
}
</style>