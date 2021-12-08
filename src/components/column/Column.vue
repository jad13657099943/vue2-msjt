<template>
  <div class="column">
    <div v-for="(item,index) in list.slice(0,5)"  :key="index" @click="cateCurriculum(item.id)">
      <img class="column_img" :src="$imgUrl+item.simage">
      <div>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import {curriculum} from '../../require/api';

export default {
  name: "Column",
  data() {
    return {
      list: '',
      params:{'is_recommend_data':1}
    }
  },
  methods: {
    cateCurriculum(val){
          this.$router.push({ path: "/searCateCurriculum", query: { 'type_id': val } });
    }
  },
  created() {
    curriculum(this.params).then(res => {
      this.list = res.data;
    })
  }
}
</script>

<style scoped>
.column {
  display: flex;
  width: 100%;
  padding: 0 0.2rem;
}

.column > div {
  width: 100%;
  text-align: center;

}

.column>div>div{
  margin-top: 0.25rem;
  font-weight: bold;
  font-size: 0.4rem;
}

.column_img{
  width: 80%;
}

</style>