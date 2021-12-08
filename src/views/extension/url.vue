<template>
  <div>
    <back title="推广名片"></back>
    <div class="url_box">
      <div class="qr_box">
        <img :src="$imgUrl + list.image" />
        <div class="bottom">
          <div id="qrCode" ref="qrCodeDiv"></div>
          <div class="title_box">
            <div class="header">美盛集团</div>
            <div>邀请您一起加入!</div>
          </div>
        </div>
      </div>
        <div class='url_bottom_box' @click="getHtml()">
        <div class='icon'></div>
        <div class='url_title'>长按保存图片</div>
        <div class='icon'></div>
    </div>
    </div>
  
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import { AdcateList, userInfo } from "../../require/api";
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
export default {
  components: {
    back,
  },
  data() {
    return {
      list: [],
      user: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getQRCode();
    });
  },
  methods: {
    getQRCode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: "https://msjt.jxsxkeji.com/index.html?uid="+this.user.id,
        width: 80,
        height: 80,
        colorDark: "#000", //二维码颜色
        colorLight: "#fff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
    },
    getHtml() {
        
      html2canvas(this.$refs.qrCodeDiv, {
        backgroundColor: null,
        width: 200,
        height: 200,
      }).then((canvas) => {
console.log( canvas)
        var imgData = canvas.toDataURL("image/jpeg");
        this.imgData = imgData;
      });
    },
  },
  created() {
    AdcateList().then((res) => {
      this.list = res.data.list[0];
    });
    userInfo().then((res) => {
      this.user = res.data;
    });
  },
};
</script>

<style lang="less" scoped>
.url_box {
  width: 100%;
  min-height: 100vh;
  background: #ccc;
  box-sizing: border-box;
  padding: 0.8rem 0.8rem 0 0.8rem;

  .qr_box {
    background: white;
    border-radius: 0.15rem;
  }
  img {
    width: 100%;
    height: 9rem;
    border-radius: 0.15rem;
  }
  .bottom {
    width: 100%;
    box-sizing: border-box;
    padding: 0.4rem;
    display: flex;
    display: -webkit-flex;
    .title_box {
      margin-left: 0.4rem;
      font-size: 0.4rem;
      .header {
        font-weight: bold;
      }
    }
  }
}
.url_bottom_box{
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    box-sizing: border-box;
    padding: 0.4rem 0;
}
.url_title{
    box-sizing: border-box;
    padding: 0 0.4rem;
}
.icon{
    width: 0.8rem;
    height: 0.05rem;
    background-color: white;
}
</style>