<template>
  <div class="lists">
    <div class="detail" v-for="item in list" :key="item.id">
      <img class="img" :src="$imgUrl + item.simages" />
      <div class="width bold">{{ item.name }}</div>
      <div class="width hui">共4节课</div>
      <div class="width">
        <div class="left">报名人数: {{ item.look_num }}人</div>
        <div class="right red bold">¥{{ item.money }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { curriculumList } from "../../require/api";
import { store } from "../../store/store";

export default {
  data() {
    return {
      params: {
        page: store.page,
        limit: store.limit,
        statedata: store.data,
        type_id: store.type_id,
      },
    };
  },
  created() {
    curriculumList(this.params).then((res) => {
      this.list = res.data.data;
    });
  },
};
</script>

<style  scoped>
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

