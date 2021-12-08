<template>
  <div>
    <back title="线上课程详情"></back>
    <img v-if="!show" class="xs_box" :src="$imgUrl + list.simages" />
    <video
      v-if="show"
      class="xs_box"
      :src="imgUrl + videoUrl"
      controls="controls"
    ></video>
    <div class="xs_bottom_box">
      <div class="xs_name">{{ list.name }}</div>
      <div class="xs_money_box">
        <div class="xs_money">{{ $project.free(list.money) }}</div>
        <div class="xs_num">{{ list.look_num }}已购</div>
      </div>
      <div class="xs_title_box">
        <vant-tabs
          v-model="active"
          class="xs_tabs"
          color="black"
          title-active-color="black"
          title-inactive-color="black"
        >
          <vant-tab title="课程目录" title-style="font-weight:bold">
            <div
              v-for="item in list.video"
              :key="item.id"
              class="xs_list_box"
              @click="switchVideo(item.urlfile)"
            >
              <div class="xian"></div>
              <div class="xs_list_title_box">
                <div class="iconfont icon-bofang"></div>
                <div class="xs_list_title">{{ item.title }}</div>
              </div>
            </div>
            <div class="xian"></div>
          </vant-tab>
          <vant-tab title="课程介绍" title-style="font-weight:bold">
            <div v-html="list.content"></div>
          </vant-tab>
        </vant-tabs>
      </div>
    </div>
    <div class="cen"></div>
    <div class="xs_bottom">
      <div class="xs_bottom_left">
        <cur-bottom
          v-if='list.id>0'
          :id="params.id"
          :cid="list.collection"
          :type="2"
        ></cur-bottom>
      </div>
      <div class="xs_bottom_right" v-if="list.money > 0">
        <div class="xs_buy" @click="toBuy()">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import CurBottom from "../../components/bottom/Cur.vue";
import { CurDet, config } from "../../require/api";
import { Tab, Tabs,Dialog } from "vant";
export default {
  components: {
    back,
    vantTab: Tab,
    vantTabs: Tabs,
    CurBottom,
  },
  data() {
    return {
      active: 0,
      show: false,
      imgUrl: "",
      videoUrl: "",
      list: [],
      params: {
        id: this.$route.query.id,
      },
    };
  },
  created() {
    CurDet(this.params).then((res) => {
      this.list = res.data;
      this.videoUrl = res.data.video[0].urlfile;
      if (res.data.is_buy > 0 || res.data.money <= 0) {
        this.show = true;
      }
    });
    config({ name: "七牛云url" }).then((res) => {
      this.imgUrl = res.data[0].value;
    });
  },
  methods: {
    switchVideo(url) {
      if (this.show) {
        this.videoUrl = url;
      } else {
        Dialog.confirm({
          title:'提示',
          message:'还未购买课程,是否前去购买?'
        })
        .then(()=>{
           this.toBuy();
        })
        .catch(()=>{

        })  
      }
    },
    toBuy(){
      let params={
        id:this.params.id,
        name:this.list.name,
        img:this.list.simages,
        money:this.list.money
      };
      this.$router.push({path:'/cur/buy',query:params});
    }
  },
};
</script>

<style lang="less" scoped>
.xs_box {
  width: 100%;
  height: 6.5rem;
}
.xs_bottom_box {
  width: 100%;
  padding: 0 0.4rem;
}
.xs_name {
  margin-top: 0.4rem;
  font-size: 0.45rem;
  font-weight: bold;
}
.xs_money_box {
  display: flex;
  justify-content: space-between;
  margin-top: 0.15rem;
  line-height: 0.8rem;
}
.xs_money {
  font-size: 0.4rem;
  font-weight: bold;
  color: red;
}
.xs_num {
  font-size: 0.4rem;
  color: #999999;
}
.xs_title_box {
  display: flex;
  width: 100%;
  text-align: center;
  margin-top: 0.2rem;
}
.xs_tabs {
  width: 100%;
}

.xs_list_box {
  width: 100%;
  height: 1.2rem;
}
.xs_list_title_box {
  display: flex;
  height: 1.19rem;
  line-height: 1.19rem;
  font-size: 0.4rem;
}
.iconfont {
  font-size: 0.5rem;
  height: 0.5rem;
  background: white;
}
.xs_list_title {
  margin-left: 0.3rem;
}
.xs_bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: white;
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: space-between;
}
.xs_bottom > div {
  width: 100%;
}
.cen {
  height: 1.2rem;
}
.xs_bottom_left {
  box-sizing: border-box;
  padding: 0 8%;
}
.xs_bottom_right {
  box-sizing: border-box;
  padding: 0 0 0 0;
}
.xs_buy {
  text-align: center;
  line-height: 1.2rem;
  background: black;
  color: white;
}
</style>