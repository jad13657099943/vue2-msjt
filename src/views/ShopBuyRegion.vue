<template>
  <div>
    <back title="收货地址"></back>
    <no-region v-if="show==2"></no-region>
    <div class="region_box" >
      <vant-radio-group v-model="radio">
        <div v-for="item in list" :key="item.id">
          <div class="region_info_box">
            <div class="region_info_check">
              <vant-radio :name="item.id" @click="to(item.id)"> </vant-radio>
            </div>
            <div class="region_info_user_box">
              <div class="region_info_user">
                  <div class="region_info_name_box">
                <div class="bold">{{ item.name }}</div>
                <div class="default" v-if="item.is_default==2">默认</div>
                  </div>
                <div>{{ item.mobile }}</div>
              </div>
              <div class="region_info_site">
                {{ item.province }}{{ item.city }}{{ item.region
                }}{{ item.content }}
              </div>
            </div>
          </div>
          <div class="width xian"></div>
        </div>
      </vant-radio-group>
      <div class="new_site" @click="toNewRegion()">新建收货地址</div>
    </div>
  </div>
</template>

<script>
import back from "../components/back/back.vue";
import noRegion from "../components/blank/regionBlank.vue";
import { RegionList } from "../require/api";
import { RadioGroup, Radio } from "vant";
export default {
  components: {
    back,
    noRegion,
    vantRadioGroup: RadioGroup,
    VantRadio: Radio,
  },
  data() {
    return {
      goodsList: JSON.parse(this.$route.query.data), 
      list: [],
      radio: "",
      show:1,
      params: {
        page: 1,
        limit: 20,
      },
    };
  },
  created() {
    RegionList(this.params).then((res) => {
      this.list = res.data.data;
      if(res.data.data.length<1) this.show=2;
      this.radio = this.list[0].id;
    });
  },
  methods: {
      to(val){
          this.goodsList[0].regionId=val;
          this.$router.replace({path:'/shopbuydetail',query:{data:JSON.stringify(this.goodsList)}})
      },
      toNewRegion(){
          this.$router.push('/region');
      }
  }
};
</script>

<style lang="less" scoped>
.region_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.4rem;
}
.region_info_box {
  width: 100%;
  height: 2.1rem;
  display: flex;
}
.region_info_check {
  width: 10%;
  box-sizing: border-box;
  padding: 0.7rem 0;
}
.region_info_user_box {
  width: 90%;
}
.region_info_user {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.3rem 0 0 0;
  font-size: 0.4rem;
}
.region_info_name_box{
    display: flex;
}

.default{
    padding: 0 0.15rem;
    background: #ff8cce;
    color: white;
    border-radius: 0.05rem;
    height: 0.42rem;
    font-size: 0.08rem;
    margin-left: 0.15rem;
    margin-top: 0.05rem;
}

.bold {
  font-weight: bold;
}
.region_info_site {
  box-sizing: border-box;
  padding: 0.45rem 0 0 0;
}
.xian {
  height: 0.01rem;
  background: rgb(238, 238, 238);
}
.new_site{
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: white;
    background: #ff8cce;
    font-size: 0.45rem;
    margin-top: 0.8rem;
    border-radius: 0.5rem;
}

</style> 
  
