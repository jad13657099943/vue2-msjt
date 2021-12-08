<template>
  <div>
    <div class="bottoms">
    </div>
    <div class="bottom">
      <div v-for="item in list" :key="item.name" v-on:click="switchTo(item.patch)" :class="item.class">
        <div>
          <img :src="item.patch==path?item.src2:item.src"></div>
        <div :class="{'red':item.patch==path}">{{ item.name }}</div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "Bottom",
  props: ['path'],
  data() {
    return {
      list: [
        {name: '首页', src: require('../../assets/img/首页-2.png'), src2: require('../../assets/img/首页.png'), patch: '/'},
        {name: '课程', src: require('../../assets/img/课程-2.png'), src2: require('../../assets/img/课程.png'), patch: '/curriculum'},
        {name: '商城', src: require('../../assets/img/商城-2.png'), src2: require('../../assets/img/商城.png'), patch: '/shop'},
        {name: '我的', src: require('../../assets/img/我的-2.png'), src2: require('../../assets/img/我的.png'), patch: '/my'}
      ]
    }
  },
  methods: {
    switchTo(url) {
      this.$router.push(url);
    }
  }
}
</script>

<style scoped>
.red {
  color: #FF8CCE;
}

.bottoms {
  width: 100%;
  height: 1.4rem;
}

.bottom {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.4rem;
  background-color: white;
}

.bottom > div {
  text-align: center;
  width: 100%;
}

img {
  width: 0.8rem;
}
</style>
