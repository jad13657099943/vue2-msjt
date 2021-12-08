<template>
  <div>
    <back title="收货地址"></back>
    <region-blank v-if="!show"></region-blank>
    <div class="site_box" v-if="show">
      <van-radio-group v-model="radio">
        <div class="site_info_box" v-for="item in list" :key="item.id">
          <div class="header">
            <div>{{ item.name }}</div>
            <div>{{ item.mobile }}</div>
          </div>
          <div class="center">
            {{ item.province }}{{ item.city }}{{ item.region
            }}{{ item.content }}
          </div>
          <div class="bottom">
            <div class="left">
              <van-radio
                :name="item.id"
                checked-color="#ff8cce"
                @click="setDefault()"
              ></van-radio>
              <div class="default_title">设为默认地址</div>
            </div>

            <div class="right">
              <div class="edit_box" @click="editSite(item)">
                <div class="iconfont icon-changyonggoupiaorenbianji"></div>
                <div>编辑</div>
              </div>
              <div class="del_box" @click="delSite(item.id)">
                <div class="iconfont icon-changyonggoupiaorenshanchu"></div>
                <div>删除</div>
              </div>
            </div>
          </div>
        </div>
      </van-radio-group>
      <div class="new_site" @click="addSite()">新建收货地址</div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import regionBlank from "../../components/blank/regionBlank";
import { RegionList, RegionDefault, RegionDel } from "../../require/api";
import { RadioGroup, Radio, Toast, Dialog } from "vant";
import RegionBlank from "../../components/blank/regionBlank.vue";
export default {
  components: {
    back,
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    regionBlank,
    RegionBlank,
  },
  data() {
    return {
      show: true,
      list: [],
      radio: "",
      params: {
        page: 1,
        limit: 100,
      },
    };
  },
  methods: {
    setDefault() {
      RegionDefault({ id: this.radio }).then((res) => {
        Toast(res.msg);
      });
    },
    addSite() {
      this.$router.push("/region");
    },
    delSite(val) {
      Dialog.confirm({
        title: "提示",
        message: "确定删除该地址吗?",
      }).then(() => {
        RegionDel({ id: val }).then((res) => {
          Toast(res.msg);
          setTimeout(() => {
            this.$router.go(0);
          }, 1000);
        });
      });
    },
    editSite(item) {
      this.$router.push({
        path: "/my/site/edit",
        query: { data: JSON.stringify(item) },
      });
    },
  },
  created() {
    RegionList(this.params).then((res) => {
      this.list = res.data.data;
      if (res.data.data.length > 0) {
        this.radio = this.list[0].id;
        this.show = true;
      } else {
        this.show = false;
      }
    });
  },
};
</script>
<style lang="less" scoped>
.site_box {
  width: 100%;
  background: #f8f8f8;
  .site_info_box {
    width: 100%;
    background: white;
    box-sizing: border-box;
    padding: 0.4rem 0.4rem 0 0.4rem;
    margin-bottom: 0.4rem;
    .header {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .center {
      width: 100%;
      box-sizing: border-box;
      padding: 0.4rem 0;
      border-bottom: 0.01rem solid #eee;
      font-size: 0.4rem;
    }
    .bottom {
      width: 100%;
      box-sizing: border-box;
      padding: 0.4rem 0;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: -webkit-flex;
        display: flex;
        .default_title {
          font-size: 0.43rem;
          margin-left: 0.2rem;
        }
      }
      .right {
        display: flex;
        display: -webkit-flex;
        .edit_box {
          display: -webkit-flex;
          display: flex;
          align-items: center;
          font-size: 0.43rem;
          margin-right: 0.4rem;
          .iconfont {
            font-size: 0.6rem;
          }
        }
        .del_box {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          font-size: 0.43rem;
          .iconfont {
            font-size: 0.65rem;
          }
        }
      }
    }
  }
  .new_site {
    width: 90%;
    background: #ff8cce;
    height: 1rem;
    border-radius: 0.45rem;
    margin: 0 auto;
    text-align: center;
    line-height: 1rem;
    color: white;
    font-size: 0.45rem;
  }
}
</style>