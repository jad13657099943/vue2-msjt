<template>
  <div class="curriculum">
    <div class="content" v-for="item in list" :key="item.id" @click="$project.toCurDetail(item.id,item.statedata)">
      <img class="curriculum_img" :src="$imgUrl + item.simages" />
      <div class="name">{{ item.name }}</div>
      <div class="info">
        <span class="left"> 已学习{{ item.look_num }}人 </span>
        <span class="right"> {{ $project.free(item.money) }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { curriculumList } from "../../require/api";

export default {
  name: "Curriculum",
  data() {
    return {
      list: "",
      params: { page: 1, limit: 2, is_recommend_data: 1 },
    };
  },
  created() {
    curriculumList(this.params).then((res) => {
      this.list = res.data.data;
    });
  },
  computed: {},
  methods: {
  },
};
</script>

<style scoped>
.curriculum {
  display: flex;
  padding: 0 0.4rem;
}
.content {
  width: 100%;
}
.curriculum_img {
  width: 93%;
  border-radius: 0.2rem;
  height: 2.5rem;
}
.name {
  padding-top: 0.15rem;
  font-size: 0.35rem;
}
.info {
  width: 93%;
  font-size: 0.25rem;
  margin-top: 0.25rem;
}
.left {
  color: #999999;
}
.right {
  color: red;
  float: right;
}
</style>