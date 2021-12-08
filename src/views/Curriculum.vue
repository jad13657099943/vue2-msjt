<template>
  <div class="curriculum">
    <div class="tops"></div>
    <div class="top">
      <div class="header">
        <div
          class="tab"
          v-for="item in decoration"
          :key="item.name"
          v-on:click="tab(item.id)"
        >
          <div :class="{ texts: statedata != item.id }">
            {{ item.name }}
          </div>
          <div :class="{ decoration: item.id == statedata }"></div>
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
    </div>
    <div>
      <div class="lists">
        <vant-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <div class="detail" v-for="item in lists" :key="item.id" @click="$project.toCurDetail(item.id,item.statedata)">
            <img class="img" :src="$imgUrl + item.simages" />
            <div class="width bold">{{ item.name }}</div>
            <div class="width hui">共4节课</div>
            <div class="width">
              <div class="left">报名人数: {{ item.look_num }}人</div>
              <div class="right red bold">{{ $project.free(item.money) }}</div>
            </div>
          </div>
        </vant-list>
      </div>
      <curriculum-bank v-if="show"></curriculum-bank>
    </div>
    <div>
      <bottom path="/curriculum"></bottom>
    </div>
  </div>
</template>

<script>
import bottom from "../components/bottom/Bottom";
import curriculumBank from "../components/blank/curriculumBlank.vue";
import { List } from "vant";

import { curriculum, curriculumList } from "../require/api";

export default {
  components: {
    bottom,
    curriculumBank,
    vantList: List,
  },
  name: "Curriculum",
  data() {
    return {
      list: [],
      lists: [],
      loading: false,
      finished: false,
      show: false,
      active: "",
      statedata: 1,
      decoration: [
        { id: 1, name: "线上课程" },
        { id: 2, name: "线下课程" },
      ],
      params: {
        page: 1,
        limit: 3,
        statedata: 1,
        type_id: "",
      },
    };
  },
  methods: {
    tab(val) {
      this.params.page=1;
      this.statedata = val;
      this.params["statedata"] = val;
    },
    bar(val) {
      this.params.page = 1;
      this.active = val;
      this.params["type_id"] = val;
    },
    onLoad() {
        if (this.lists.length < 1) {
        this.loading = false;
        return;
      }
      this.params.page += 1;
      curriculumList(this.params).then((res) => {
        for (let item in res.data.data) {
          this.lists.push(res.data.data[item]);
        }
        this.loading = false;
        if (
          this.lists.length >= res.data.total ||
          res.data.current_page >= res.data.last_page
        )
          this.finished = true;
      });
    },
    getList() {
       this.params.page = 1;
       this.finished = false;
      curriculumList(this.params).then((res) => {
        this.lists = res.data.data;
        if (this.lists.length < 1) {
          this.show = true;
        } else {
          this.show = false;
        }
        if (
          res.data.data.length < 1 ||
          res.data.current_page >= res.data.last_page
        ) {
          this.loading = false;
          this.finished = true;
        }
      });
    },
  },
  created() {
    curriculum().then((res) => {
      res.data.unshift({ name: "全部", id: "" });
      this.list = res.data;
    });
    this.getList();
  },
  watch: {
    active() {
      this.getList();
    },
    statedata() {
      this.getList();
    },
  },
};
</script>

<style scoped>
.top {
  position: fixed;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  background: white;
}
.tops {
  width: 100%;
  height: 2.3rem;
}
.header {
  display: flex;
  width: 100%;
  height: 1.2rem;
  box-sizing: border-box;
  padding: 0.1rem;
}

.tab {
  width: 100%;
  text-align: center;
  font-size: 0.4rem;
  line-height: 1rem;
  font-weight: bold;
}

.texts {
  color: #646566;
}

.decoration {
  width: 1.4rem;
  height: 0.02rem;
  background: #ff8cce;
  margin: 0 auto;
}

.header_box {
  width: 50%;
  height: 100%;
  margin: 0 auto;
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

.bold {
  font-weight: bold;
  font-size: 0.4rem;
}
.hui {
  color: #999999;
}
.red {
  color: #f44336;
}
.left {
  float: left;
}
.right {
  float: right;
}
.lists {
  width: 100%;
  box-sizing: border-box;
  padding: 0.2rem;
}
.detail {
  width: 100%;
  box-sizing: border-box;
  padding: 0.1rem;
}
.img {
  width: 100%;
  border-radius: 0.15rem;
}
.width {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
}
</style>
