<template>
  <div class="home">
    <div class="header" @click='search'>
      <search msg='请输入课程/商品名称'></search>
    </div>
    <div class="swipe">
      <swipe></swipe>
    </div>
    <div>
      <column></column>
    </div>
    <div>
      <labels>推荐课程</labels>
      <curriculum></curriculum>
    </div>
    <div>
      <labels>严选好物</labels>
      <goods page='1' limit='4' is_recommend_data='1'></goods>
    </div>
    <div>
      <bottom path="/"></bottom>
    </div>
  </div>
</template>

<script>
import search from '../components/search/Search';
import swipe from '../components/swipe/Swipe';
import column from '../components/column/Column';
import labels from '../components/label/Label';
import curriculum from '../components/list/Curriculum';
import goods from '../components/list/Goods';
import bottom from '../components/bottom/Bottom';

export default {
  components: {
    search,
    swipe,
    column,
    labels,
    curriculum,
    goods,
    bottom
  },
  methods: {
    search(){
      this.$router.push('/search');
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  padding: 0.4rem 0 0 0;
}

.home > div {
  width: 100%;
}

.header {
  width: 100%;
  height: 0.8rem;
  padding: 0 0.4rem;
  box-sizing: border-box;
}

.swipe {
  padding: 0.2rem;
}
</style>
