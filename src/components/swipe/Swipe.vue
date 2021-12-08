<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img class="swipe_img" v-lazy="$imgUrl + item.image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload } from "vant";
import { swipe } from "../../require/api";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
export default {
  name: "Swipe",
  data() {
    return {
      images: "",
      params: { name: "首页焦点" },
    };
  },
  created() {
    swipe(this.params).then((res) => {
      this.images = res.data.list;
    });
  },
};
</script>

<style scoped>
.swipe_img {
  width: 100%;
  height: 4.6rem;
  border-radius: 0.15rem;
}
</style>