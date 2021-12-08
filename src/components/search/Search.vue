<template>
  <div class="search">
    <div class="iconfont icon-sousuo"></div>
    <input type="text"  :placeholder="this.msg">
  </div>
</template>

<script>
export default {
  props: ["msg"],
  name: "Search"
}
</script>

<style scoped>
.iconfont {
  line-height: 0.8rem;
}

.search {
  width: 100%;
  padding: 0 0.4rem;
  box-sizing: border-box;
  height: 0.8rem;
  display: flex;
  background-color: #ededed;
  border-radius: 1rem;
}

.search input {
  border: none;
  height: 0.8rem;
  flex: 1;
  background-color: #ededed;
  font-size: 0.32rem;
  margin-left: 0.24rem;
}
</style>