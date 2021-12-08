<template>
  <div>
    <back url="/" title="分类"></back>
    <div class="search_input width">
      <div class="left">
        <div class="searchs">
          <div class="iconfont icon-sousuo sousuo"></div>
          <input v-model="text" type="text" :placeholder="placeholder" />
        </div>
      </div>
      <div class="right">
        <div @click="detail">搜索</div>
      </div>
    </div>
    <div>
      <div class="bar">
        <div class="bars">
          <div
            class="list"
            v-for="item in list"
            :class="{ text: item.id == active }"
            :key="item.id"
            v-on:click="bar(item.id)"
          >
            <div class="name">{{ item.name }}</div>
            <div :class="{ decorations: item.id == active }"></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="width list_border">
        <div class="width lists" v-for="item in lists" :key="item.id" @click="$project.toCurDetail(item.id,item.statedata)">
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
  </div>
</template>

<script>
import back from "../components/back/back.vue";
import curriculumBank from "../components/blank/curriculumBlank.vue";
import { curriculum, curriculumList } from "../require/api";

export default {
  components: {
    back,
    curriculumBank,
  },
  data() {
    return {
      statedata: 1,
      active: this.$route.query.type_id,
      text: "",
      placeholder: "请输入课程名称",
      list: "",
      lists: "",
      show: false,
      params: {
        page: 1,
        limit: 20,
        type_id: this.$route.query.type_id,
        name: "",
      },
    };
  },
  methods: {
    detail() {
      this.params.name = this.text;
      curriculumList(this.params).then((res) => {
        this.lists = res.data.data;
        if (this.lists.length === 0) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
    },
    bar(val) {
      this.active = val;
      this.params["type_id"] = val;
      curriculumList(this.params).then((res) => {
        this.lists = res.data.data;
        if (this.lists.length === 0) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
    },
  },
  created() {
    curriculum().then((res) => {
      this.list = res.data;
    });
    curriculumList(this.params).then((res) => {
      this.lists = res.data.data;
      if (this.lists.length === 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
  },
};
</script>

<style scoped>
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

.bar {
  width: 100%;
}
.bars {
  width: 100%;
  height: 1.1rem;
  text-align: center;
  display: -webkit-flex;
  color: #646566;
  font-size: 0.4rem;
  box-sizing: border-box;
  padding: 0.1rem;
}
.list {
  width: 100%;
  height: 100%;
}

.name {
  width: 100%;
  height: 0.8rem;
}

.text {
  color: black;
}

.decorations {
  width: 1rem;
  height: 0.1rem;
  background: #ff8cce;
  margin: 0 auto;
  border-radius: 0.5rem;
}
.list_border {
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
}
.hui {
  color: #999999;
}
.lists {
  display: flex;
  margin-bottom: 0.22rem;
}
.lists > div {
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
</style>