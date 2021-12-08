<template>
  <div>
    <div class="width header">
      <div class="iconfont icon-yemianfanhui return" @click="home"></div>
      <div class="search">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url", "title"],
  methods: {
    home() {
      //this.$router.push(this.url);
      this.$router.go(-1);
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
</style>