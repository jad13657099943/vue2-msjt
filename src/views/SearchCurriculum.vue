<template>
  <div>
    <back url="/search" title="搜索"></back>
    <div class="search_input width">
      <div class="left">
        <div class="searchs">
          <div class="iconfont icon-sousuo sousuo"></div>
          <input v-model="val" type="text" placeholder="请输入课程名称" />
        </div>
      </div>
      <div class="right">
        <div @click="detail">搜索</div>
      </div>
    </div>
    <div class="width list_border">
      <div class="width list" v-for="item in list" :key="item.id" @click="$project.toCurDetail(item.id,item.statedata)">
        <div>
          <img class="img" :src="$imgUrl + item.simages" />
        </div>
        <div>
          <div class="bold list_name">{{ item.name }}</div>
          <div class="hui list_look_num">观看人数:{{ item.look_num }}</div>
          <div class="hui list_createtime">
            时间:{{ $common.changeTime(item.createtime) }}
          </div>
          <div class="list_money">{{ $project.free(item.money) }}</div>
        </div>
      </div>
      <curriculum-bank v-if="show"></curriculum-bank>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { curriculumList } from "../require/api";
import curriculumBank from "../components/blank/curriculumBlank.vue";
import back from "../components/back/back.vue";
export default {
  components: {
    curriculumBank,
    back,
  },
  data() {
    return {
      show: false,
      val: "",
      list: "",
    };
  },
  methods: {
    detail() {
      if (this.val == "") {
        Toast("请输入课程名称");
      } else {
        let param = { page: 1, limit: 20, name: this.val };
        curriculumList(param).then((res) => {
          this.list = res.data.data;
          if (this.list.length === 0) {
            this.show = true;
          } else {
            this.show = false;
          }
        });
      }
    },
  },
  created() {
    this.val = this.$route.query.name;
    let param = { page: 1, limit: 10, name: this.val };
    curriculumList(param).then((res) => {
      this.list = res.data.data;
      if (this.list.length === 0) {
          this.show = true;
        } else {
          this.show = false;
        }
    });
  },
};
</script>

<style scoped>
.header {
  height: 1.2rem;
  display: flex;
  box-sizing: border-box;
  padding: 0 0.3rem;
  text-align: center;
  line-height: 1.2rem;
  border-bottom: 0.02667rem solid #eee;
}
.return {
  width: 10%;
  font-size: 0.7rem !important;
}
.search {
  width: 85%;
  font-weight: bold;
  color: #333333;
  font-size: 0.42rem;
}
.search_input {
  box-sizing: border-box;
  padding: 0.3rem 0.3rem;
  height: 1.5rem;
  display: flex;
}
.left {
  width: 87%;
  margin-top: 0.1rem;
}
.right {
  width: 13%;
  text-align: center;
  padding-left: 0.3rem;
  line-height: 0.95rem;
}
.sousuo {
  line-height: 0.8rem;
}
.searchs {
  width: 100%;
  padding: 0 0.4rem;
  box-sizing: border-box;
  height: 0.8rem;
  display: flex;
  background-color: #ededed;
  border-radius: 1rem;
}
.searchs input {
  border: none;
  height: 0.8rem;
  flex: 1;
  background-color: #ededed;
  font-size: 0.32rem;
  margin-left: 0.24rem;
}

.list_border {
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
}
.hui {
  color: #999999;
}
.list {
  display: flex;
  margin-bottom: 0.22rem;
}
.list > div {
  width: 50%;
}
.img {
  width: 95%;
  height: 2.5rem;
  border-radius: 0.2rem;
}
.list_name {
  font-size: 0.4rem;
}
.list_look_num {
  margin-top: 0.1rem;
}
.list_createtime {
  margin-top: 0.1rem;
}
.list_money {
  color: red;
  font-size: 0.38rem;
  font-weight: bold;
  margin-top: 0.34rem;
}
</style>>
