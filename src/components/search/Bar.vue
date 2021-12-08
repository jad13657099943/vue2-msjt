<template>
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
</template>

<script>
import { curriculum } from "../../require/api";
import { store } from "../../store/store";
export default {
  data() {
    return {
      list: [],
      active: "",
      params: { page: 1, limt: 4, statedata: 1, type_id: "" },
    };
  },
  created() {
    curriculum().then((res) => {
      res.data.unshift({ name: "全部", id: "" });
      this.list = res.data;
    });
  },
  methods: {
    bar(val) {
      this.active = val;
      this.params["type_id"] = val;
      store.setVal("type_id", val);
    },
  },
};
</script>

<style scoped>
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
</style>>

