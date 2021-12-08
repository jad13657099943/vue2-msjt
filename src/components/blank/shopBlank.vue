<template>
  <div class='none'>
      <div class="img_div">
 <img class='img' src="@/assets/img/none_goods.png">
      </div>
     <div class="msg">
         抱歉,还没有相关商品哦!
     </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.none{
    background: white;
}
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
}

</style>