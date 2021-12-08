<template>
  <div>
    <div class="collection_header_box">
      <div class="iconfont icon-yemianfanhui return" @click="home()"></div>
      <div class="text">我的收藏</div>
      <div class="edit" @click="edit()">{{ this.title }}</div>
    </div>
    <van-tabs v-model="params.type" color="#ff8cce" @click="setType()">
      <van-tab title="商品" name="1"></van-tab>
      <van-tab title="课程" name="2"></van-tab>
    </van-tabs>
    <collection-blank v-if="!show"></collection-blank>
    <div v-if="show">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div v-if="this.params.type == 1">
            <div class="info_box" v-for="item in list" :key="item.id" @click="toInfo(item.goods.id,1,0)">
              <van-checkbox
                @click="setCheck()"
                v-if="isbox"
                :name="item.id"
                class="check"
              ></van-checkbox>
              <img class="collection_img" :src="$imgUrl + item.goods.simages" />
              <div class="right">
                <div class="right_top">{{ item.goods.name }}</div>
                <div class="right_bottom">
                  ¥ {{ JSON.parse(item.goods.configjson)[0].shop_price }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.params.type == 2">
            <div class="info_box" v-for="item in list" :key="item.id" @click="toInfo(item.curriculum.id,2,item.curriculum.statedata)">
              <van-checkbox
                @click="setCheck()"
                v-if="isbox"
                :name="item.id"
                class="check"
              ></van-checkbox>
              <img
                class="collection_img"
                :src="$imgUrl + item.curriculum.simages"
              />
              <div class="right">
                <div class="right_top">{{ item.curriculum.name }}</div>
                <div class="right_bottom">
                  ¥ {{ $project.free(item.curriculum.money) }}
                </div>
              </div>
            </div>
          </div>
        </van-checkbox-group>
      </van-list>
    </div>
    <div class="bottom" v-if="isbox">
      <div class="bottom_left">
        <van-checkbox v-model="isCheck" @click="check()"></van-checkbox>
        <div class="bottom_msg">全选</div>
      </div>
      <div class="bottom_right" @click="del()">删除</div>
    </div>
  </div>
</template>

<script>
import { Tabs, Tab, List, Checkbox, CheckboxGroup, Dialog, Toast } from "vant";
import { CollectionList, CollectionDel } from "../../require/api";
import collectionBlank from "../../components/blank/collectionBlank.vue";
export default {
  components: {
    vanTabs: Tabs,
    vanTab: Tab,
    vanList: List,
    vanCheckbox: Checkbox,
    vanCheckboxGroup: CheckboxGroup,
    collectionBlank,
  },
  mounted() {
    window.vue = this;
  },
  data() {
    return {
      title: "编辑",
      isbox: false,
      isCheck: false,
      result: [],
      show: true,
      loading: false,
      finished: false,
      list: [],
      params: {
        limit: 10,
        page: 1,
        type: 1,
      },
    };
  },
  methods: {
    home() {
      this.$router.go(-1);
    },
    edit() {
      if (this.isbox) {
        this.isbox = false;
        this.title = "编辑";
      } else {
        this.isbox = true;
        this.title = "取消";
      }
    },
    onLoad() {
      this.getLoadList();
    },
    setType() {
      this.result = [];
      this.isCheck = false;
      this.getList();
    },
    toInfo(id,type,state){
       if(type==1){
           this.$router.push({path:'/shopdetail',query:{id:id}})
       }else{
            if(state=='1') this.$router.push({path:'/cur/shang',query:{id:id}})
            if(state=='2') this.$router.push({path:'/cur/xia',query:{id:id}})
       }
    },
    check() {
      if (this.isCheck) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    setCheck() {
      if (this.result.length == this.list.length) {
        this.isCheck = true;
      } else {
        this.isCheck = false;
      }
    },
    del() {
      if (this.result.length < 1) return Toast("请选择收藏");
      Dialog.confirm({
        title: "提示",
        message: "是否确定取消收藏?",
      })
        .then(() => {
          CollectionDel({ id: this.result }).then((res) => {
            Toast(res.msg);
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
          });
        })
        .catch(() => {});
    },
    getList() {
      this.params.page = 1;
      this.finished = false;
      CollectionList(this.params).then((res) => {
        this.list = res.data.data;
        if (this.list.length > 0) {
          this.show = true;
        } else {
          this.show = false;
        }
        if (
          this.list.length >= res.data.total ||
          res.data.current_page >= res.data.last_page
        ) {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    getLoadList() {
      if (this.list.length < 1) {
        this.loading = false;
        return;
      }
      this.params.page += 1;
      CollectionList(this.params).then((res) => {
        for (let item of res.data.data) {
          this.list.push(item);
        }
        this.loading = false;
        if (
          this.list.length >= res.data.total ||
          res.data.current_page >= res.data.last_page
        ) {
          this.finished = true;
        }
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.collection_header_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.4rem;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.2rem;
  border-bottom: 0.01rem solid #eee;
  .return {
    font-size: 0.7rem;
  }
  .text {
    font-size: 0.425rem;
    font-weight: bold;
  }
  .edit {
    color: #999999;
  }
}
.info_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem;
  display: flex;
  display: -webkit-flex;
  border-top: 0.4rem solid #eee;
  .collection_img {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 0.15rem;
  }
  .right {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 0.4rem;
    .right_top {
      font-size: 0.4rem;
      font-weight: bold;
    }
    .right_bottom {
      font-size: 0.4rem;
      color: red;
      font-weight: bold;
    }
  }
}
.check {
  margin-right: 0.4rem;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.2rem;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0rem 0.4rem;
  font-size: 0.4rem;
  .bottom_left {
    display: flex;
  }
  .bottom_msg {
    margin-left: 0.4rem;
  }
  .bottom_right {
    background: #ff8cce;
    color: white;
    text-align: center;
    box-sizing: border-box;
    padding: 0.2rem 0.8rem;
    border-radius: 0.45rem;
  }
}
</style>