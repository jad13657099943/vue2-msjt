<template>
  <div class="width">
    <back url='/' title='搜索'></back>
    <div class="width title">
      <div @click="title(1)">
        <div class="title_kc" :class="{ hui: type != 1 }">搜课程</div>
        <div :class="{ decoration: type == 1 }"></div>
      </div>
      <div @click="title(2)">
        <div class="title_goods" :class="{ hui: type != 2 }">搜商品</div>
        <div :class="{ decoration: type == 2 }"></div>
      </div>
    </div>
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
    <div class="width history">
      <div class="history_title">历史记录</div>
      <div
        class="iconfont icon-changyonggoupiaorenshanchu history_icon"
        @click="del()"
      ></div>
    </div>
    <div class="width history_list">
      <div class="list_detail" v-for="item in list" :key="item.id">
        {{ item.title }}
      </div>
    </div>
    <div class="width history">
      <div class="history_title">热门搜索</div>
    </div>
    <div class="width history_list">
      <div
        class="list_detail"
        v-for="item in lists"
        :key="item.id"
        @click="search(item.title)"
      >
        {{ item.title }}
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { searchList, hot, searchDel } from "../require/api";
import { Toast, Dialog } from "vant";
import back from '../components/back/back.vue';
export default {
  components: {
    back
  },
  data() {
    return {
      type: 1,
      placeholder: "请输入课程名称",
      list: "",
      lists: "",
      text: "",
    };
  },
  created() {
    let param = { type: 2 };
    searchList(param).then((res) => {
      this.list = res.data.data;
    });
    let params = { limit: 5, page: 1 };
    hot(params).then((res) => {
      this.lists = res.data.data;
    });
  },
  methods: {
    title(val) {
      this.type = val;
      if (val == 2) {
        this.placeholder = "请输入商品名称";
      }
      if (val == 1) {
        this.placeholder = "请输入课程名称";
      }
    },
    detail() {
      if (this.type == 1) {
        if (this.text == "") {
          Toast("请输入课程名称");
        } else {
          this.$router.push({ path: "/searcurr", query: { name: this.text } });
        }
      }
      if (this.type == 2) {
        if (this.text == "") {
          Toast("请输入商品名称");
        } else {
          this.$router.push({ path: "/searshop", query: { name: this.text } });
        }
      }
    },
    del() {
      Dialog.confirm({
        title: "提示",
        message: "是否要删除历史记录?",
      })
        .then(() => {
          let arr = [];
          this.list.forEach((item) => {
            arr.push(item.id);
          });
          let params = { id: arr };
          searchDel(params).then((res) => {
            Toast(res.msg);
          });
        })
        .catch(() => {});
    },
    search(val) {
      if (this.type == 1) {
        this.$router.push({ path: "/searcurr", query: { name: val } });
      }
      if (this.type == 2) {
        this.$router.push({ path: "/searshop", query: { name: val } });
      }
    },
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
.title {
  height: 1.5rem;
  display: flex;
  box-sizing: border-box;
  padding: 0 0.3rem;
  text-align: center;
  line-height: 1.5rem;
  font-size: 0.42rem;
}
.title > div {
  width: 50%;
  height: 100%;
}
.title_kc {
  height: 90%;
}
.title_goods {
  height: 90%;
}
.decoration {
  width: 1.4rem;
  height: 0.08rem;
  background: #ff8cce;
  margin: 0 auto;
  border-radius: 0.1rem;
}
.hui {
  color: #999999;
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

.history {
  display: flex;
  box-sizing: border-box;
  padding: 0.2rem 0.4rem;
}
.history_title {
  width: 92%;
  color: black;
  font-weight: bold;
}
.history_icon {
  width: 8%;
  text-align: center;
  font-size: 0.48rem;
}
.history_list {
  display: flex;
  box-sizing: border-box;
  padding: 0 0.4rem;
  flex-wrap: wrap;
}
.list_detail {
  border: 0.01rem solid #ccc;
  border-radius: 0.26rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.26rem;
  margin: 0.2rem 0.4rem 0 0;
}
</style>