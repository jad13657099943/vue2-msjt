<template>
  <div>
    <div class="cur_box">
      <div @click="home()">
        <div class="iconfont icon-shouye"></div>
        <div class="bold">首页</div>
      </div>
      <div @click="kefu()">
        <div class="iconfont icon-kefu"></div>
        <div class="bold">客服</div>
      </div>
      <div @click="shoucang()">
        <div
          class="iconfont"
          :class="[
            this.show > 0 ? 'active icon-shoucang1' : 'icon-wodeshoucang',
          ]"
        ></div>
        <div class="bold">收藏</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { config, CurCollectionAdd, CurCollectionDel } from "../../require/api";
export default {
  props: ["id", "cid", "type"],
  data() {
    return {
      show: this.cid,
      config: [],
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    kefu() {
      Dialog.confirm({
        title: "提示",
        message: this.config[0].value,
      })
        .then(() => {
          window.location.href = "tel://" + this.config[0].value;
        })
        .catch(() => {});
    },
    shoucang() {
      if (this.show > 0) {
        CurCollectionDel({ id: [this.show] }).then((res) => {
          this.show='';  
          Toast(res.msg);
        });
      } else {
        CurCollectionAdd({ collection_id: this.id, type: this.type }).then(
          (res) => {
            this.show=res.data;  
            Toast(res.msg);
          }
        );
      }
    },
  },
  created() {
    config({ name: ["客服电话"] }).then((res) => {
      this.config = res.data;
    });
  },
};
</script>

<style lang="less" scoped>
.cur_box {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 0.3rem;
  justify-content: space-between;
}
.iconfont {
  font-size: 0.66rem !important;
}
.bold {
  font-weight: bold;
}
.active {
  color: #ff8cce;
}
</style>