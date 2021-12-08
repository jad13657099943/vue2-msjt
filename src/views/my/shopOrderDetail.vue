<template>
  <div>
    <back title="订单详情"></back>
    <div class="detail_heade_box">
      <div class="detail_msg_box">
        <div class="iconfont icon-xianshi_quxiaotianchong"></div>
        <div class="detail_msg">{{ $project.getStatusText(list.status) }}</div>
      </div>
      <div class="detail_site_box">
        <div>
          <div class="img_box">
            <img class="site_img" src="../../assets/img/order_address.png" />
          </div>

          <div class="site_info">
            <div class="site_info_header">
              <div>{{ list.site.name }}</div>
              <div class="site_mobile">{{ list.site.mobile }}</div>
            </div>
            <div>
              {{ list.site.province }}{{ list.site.city }}{{ list.site.region
              }}{{ list.site.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail_bottom">
      <div class="goods_box">
        <div class="goods_info">
          <div class="goods_info_box">
            <div v-for="item in list.goods" :key="item.id" class="goods_detail">
              <img :src="$imgUrl + item.info.simages" class="goods_img" />
              <div class="goods_detail_box">
                <div class="goods_detail_header">
                  <div class="info_name">{{ item.info.name }}</div>
                  <div class="sku_name">{{ item.sku.name }}</div>
                </div>
                <div class="goods_detail_bottom">
                  <div>¥ {{ item.sku.shop_price }}</div>
                  <div>x{{ item.num }}</div>
                </div>
              </div>
            </div>
            <div class="sum_box">
              <div class="sum_title">商品总价</div>
              <div class="sum_money">¥ {{ list.goods_num }}</div>
            </div>
            <div class="sum_box">
              <div class="sum_title">基础运费</div>
              <div class="sum_money">免运费</div>
            </div>
            <div class="xian margin_top"></div>
            <div class="pay_box">
              <div>实付:</div>
              <div class="pay_money">
                ¥ {{ list.pay_money ? list.pay_money : 0 }}
              </div>
            </div>
          </div>
        </div>
        <div class='goods_remarks_box'>
           <div class='goods_remarks'>
              <div class='font-size'>订单备注</div>
              <div class='remarks'>{{list.remarks}}</div>
           </div>
        </div>
        <div class='goods_remarks_box'>
          <div class='goods_remarks font-size'>
             <div>订单编号:{{list.order_no}}</div>
             <div class='remarks'>下单时间:{{$common.changeTime(list.createtime,2)}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import { UserDeatil } from "../../require/api";
export default {
  components: {
    back,
  },
  data() {
    return {
      list: [],
      params: {
        id: this.$route.query.id,
      },
    };
  },
  created() {
    UserDeatil(this.params).then((res) => {
      this.list = res.data;
    });
  },
};
</script>

<style lang="less" scoped>
.detail_heade_box {
  width: 100%;
  height: 4.5rem;
  background-image: url("../../assets/img/my_bg.png");
}
.detail_msg_box {
  display: flex;
  box-sizing: border-box;
  padding: 0.8rem 0.4rem;
  line-height: 1rem;
}
.iconfont {
  color: white;
  font-size: 0.8rem;
}
.detail_msg {
  font-size: 0.5rem;
  color: white;
  font-weight: bold;
  margin-left: 0.4rem;
}
.detail_bottom {
  width: 100%;
  min-height: 10rem;
  background: #eee;
}
.detail_site_box {
  width: 100%;
  height: 3rem;
  padding: 0.4rem;
  box-sizing: border-box;
  z-index: 100;
  margin-top: 0.7rem;
  position: absolute;
}
.detail_site_box > div {
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 0.15rem;
  display: flex;
  padding: 0.5rem;
  box-sizing: border-box;
}
.img_box {
  box-sizing: border-box;
  padding: 0.19rem 0;
}
.site_img {
  width: 0.8rem;
  height: 0.8rem;
}
.site_info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.4rem;
}
.site_info_header {
  display: flex;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.4rem;
}
.site_mobile {
  margin-left: 0.4rem;
}
.goods_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem;
}
.goods_info {
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem 0rem 0 0rem;
}
.goods_info_box {
  background: white;
  border-radius: 0.15rem;
}
.goods_detail {
  box-sizing: border-box;
  padding: 0.4rem 0.4rem 0 0.4rem;
  display: flex;
}
.goods_img {
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.15rem;
}
.goods_detail_box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.4rem;
  width: 100%;
}
.goods_detail_header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .info_name {
    font-size: 0.4rem;
    font-weight: bold;
  }
  .sku_name {
    color: #999999;
    margin-top: 0.4rem;
  }
}
.goods_detail_bottom {
  display: flex;
  justify-content: space-between;
}
.sum_box {
  display: flex;
  justify-content: space-between;
  font-size: 0.4rem;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem 0 0.4rem;
}
.sum_money {
  font-weight: bold;
}
.pay_box {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  font-size: 0.4rem;
  box-sizing: border-box;
  padding: 0.4rem;
  line-height: 0.4rem;
}
.pay_money {
  color: red;
  font-weight: bold;
}
.goods_remarks_box{
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem 0;
}
.goods_remarks{
  background: white;
  border-radius: 0.15rem;
  box-sizing: border-box;
  padding: 0.4rem;
}
.remarks{
  margin-top: 0.4rem;
}
</style>