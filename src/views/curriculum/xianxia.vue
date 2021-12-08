<template>
  <div>
    <back title="线下课程详情"></back>
    <vant-swipe :autoplay="3000">
      <vant-swipe-item v-for="(item, index) in list.fimages" :key="index">
        <img class="xia_img" :src="$imgUrl + item" />
      </vant-swipe-item>
    </vant-swipe>
    <div class="xia_box">
      <div class="xia_name">
        {{ list.name }}
      </div>
      <div class="xia_num">{{ list.look_num }}人已报名</div>
      <div class="xia_js">课程介绍</div>
      <div class="xia_content">
        {{ list.content }}
      </div>
    </div>
    <div class='xia_bottom'>
      <div class='xia_icon xia_div_box'>
      <cur-bottom v-if="list.id>0" :id='params.id' :type='2' :cid='list.collection'>
      </cur-bottom>
      </div>
    
      <div class='xia_bm xia_div_box' @click="toBm()">
        立即报名
      </div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import CurBottom from '../../components/bottom/Cur.vue';
import { CurDet } from "../../require/api";
import { Swipe, SwipeItem, Lazyload } from "vant";
import Vue from "vue";
Vue.use(Lazyload);
export default {
  mounted () {
     window.vue=this;
  },
  components: {
    back,
    vantSwipe: Swipe,
    vantSwipeItem: SwipeItem,
    CurBottom
  },
  data() {
    return {
      list: [],
      show:'',
      params: {
        id: this.$route.query.id,
      },
    };
  },
  methods: {
    toBm(){
      this.$router.push({path:'/cur/xia/bm',query:{name:this.list.name,img:this.list.simages,id:this.$route.query.id}});
    }
  },
  created() {
    CurDet(this.params).then((res) => {
      this.list = res.data;
      this.list.fimages = this.list.fimages.split(",");

    });
  },
};
</script>

<style lang="less" scoped>
.xia_img {
  width: 100%;
  height: 6.6rem;
}
.xia_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem;
}
.xia_name {
  font-size: 0.45rem;
  font-weight: bold;
}
.xia_num {
  color: #999999;
  margin-top: 0.4rem;
  font-weight: bold;
}
.xia_js {
  font-size: 0.4;
  font-weight: bold;
  margin-top: 0.4rem;
}
.xia_content {
  margin-top: 0.4rem;
  text-indent: 0.8rem;
}
.xia_bottom{
  width: 100%;
  background: white;
  height: 1.225rem;
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0 0 0 0.4rem;
  display: flex;
  justify-content: space-between;
}
.xia_div_box{
  width: 47.5%;
  height: 100%;
}
.xia_bm{
  text-align: center;
  line-height: 1.225rem;
  background: #333333;
  color: white;
  font-size: 0.4rem;
}
</style>