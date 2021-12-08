<template>
  <div>
    <back title="收货地址"></back>
    <div class="region_box">
      <div class="content_box">
        <div class="bold">收货人</div>
        <input
          v-model="params.name"
          class="region_name bold"
          type="text"
          placeholder="姓名"
        />
      </div>
      <div class="width xian"></div>
      <div class="content_box">
        <div class="bold">手机号码</div>
        <input
          v-model="params.mobile"
          class="region_name bold"
          type="text"
          placeholder="手机号"
        />
      </div>
      <div class="width xian"></div>
      <div class="content_box">
        <div class="bold">选择地区</div>
        <div class="region_name bold" @click="toArea()">
          <input
            disabled="disabled"
            type="text"
            v-model="site"
            placeholder="省、市、区"
          />
        </div>
      </div>
      <div class="width xian"></div>
      <div class="content_box">
        <textarea
          class="region_site"
          v-model="params.content"
          placeholder="请填写详细的地址（街道、楼牌等）"
        ></textarea>
      </div>
      <div class="width xian"></div>
      <div class="content_box">
        <div class="bold">设置默认地址</div>
        <div class="check">
          <vant-switch
            v-model="check"
            size="0.45rem"
            active-color="#ee0a24"
            inactive-color="#dcdee0"
          ></vant-switch>
        </div>
      </div>
      <div class="yes" @click="add()">确定</div>
    </div>
    <vant-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: 'auto' }"
    >
      <vant-area
        title=""
        :area-list="areaList"
        @change="onChange()"
        @cancel="onCancel()"
        @confirm="confirm"
      />
    </vant-popup>
  </div>
</template>

<script>
import back from "../components/back/back.vue";
import { Switch, Popup, Area, Toast, Dialog } from "vant";
import { areaList } from "@vant/area-data";
import { RegionAdd } from "../require/api";
export default {
  components: {
    back,
    vantSwitch: Switch,
    vantPopup: Popup,
    vantArea: Area,
  },
  data() {
    return {
      show: false,
      areaList: areaList,
      site: "",
      check: false,
      params: {
        city: "",
        province: "",
        region: "",
        content: "",
        is_default: 1,
        mobile: "",
        name: "",
      },
    };
  },
  methods: {
    toArea() {
      this.show = true;
    },
    onCancel() {
      this.show = false;
    },
    onChange() {},
    confirm(val) {
      this.site = val[0].name + val[1].name + val[2].name;
      this.params.province = val[0].name;
      this.params.city = val[1].name;
      this.params.region = val[2].name;
      this.show = false;
    },
    add() {
      if (this.params.name == "") return Toast("请输入收货人姓名");
      if (!this.$common.isMobile(this.params.mobile))
        return Toast("请输入正确的手机号");
      if (this.site == "") return Toast("请选择地区");
      if (this.params.content == "") return Toast("请输入详细的地址");
      Dialog.confirm({
        title: "提示",
        message: "确定保存本次编辑结果吗?",
      }).then(() => {
        if (this.check) this.params.is_default = 2;
        RegionAdd(this.params).then((res) => {
          Toast(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        });
      });
    },
  },
};
</script>

<style scoped>
.region_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.4rem;
  height: auto;
}

.xian {
  height: 0.01rem;
  background: rgb(238, 238, 238);
}

.bold {
  font-size: 0.4rem;
  font-weight: bold;
}

.content_box {
  width: 100%;
  display: flex;
  height: auto;
  line-height: 1.3rem;
  justify-content: space-between;
}

.region_name {
  border: 0;
  width: 70%;
  font-size: 0.4rem;
  margin-left: 1rem;
  margin-top: 0.025rem;
  height: 1.275rem;
}

.region_name > input {
  border: 0;
  width: 100%;
  height: 100%;
  background: white;
}

.region_site {
  width: 100%;
  border: 0;
  height: 2.5rem;
  font-size: 0.4rem;
}

.check {
  box-sizing: border-box;
  padding: 0.16rem 0;
}

.yes {
  width: 95%;
  height: 1.1rem;
  margin: 0 auto;
  text-align: center;
  line-height: 1.1rem;
  font-size: 0.4rem;
  color: white;
  background: #ff8cce;
  border-radius: 0.55rem;
}
</style>