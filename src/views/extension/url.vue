<template>
  <div>
    <back title="推广名片"></back>
    <div class="url_box">
      <!--  <canvas id="can_img"></canvas> -->
      <img class="qr_img" :src="img" v-if="!show" />
      <div class="qr_box" ref="qr" v-show="show">
        <img
          crossorigin="anonymous"
          class="img"
          id="hb"
          src="../../assets/img/hb.jpg"
        />
        <div class="bottom">
          <div id="qrCode" ref="qrCodeDiv"></div>
          <div class="title_box">
            <div class="header">美盛集团</div>
            <div>邀请您一起加入!</div>
          </div>
        </div>
      </div>

      <div class="url_bottom_box">
        <div class="icon"></div>
        <div class="url_title">长按保存图片</div>
        <div class="icon"></div>
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
      show: true,
      list: [],
      user: [],
      img: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getQRCode();
      setTimeout(() => {
        this.getBase64();
        this.getHtml();
      }, 100);
    });
  },
  methods: {
    getQRCode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: "https://msjt.jxsxkeji.com/index.html?uid=" + this.user.id,
        width: 80,
        height: 80,
        colorDark: "#000", //二维码颜色
        colorLight: "#fff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
    },
    getHtml() {
      html2canvas(this.$refs.qr, {
        /*     useCORS: true, 
        allowTaint: true,
        taintTest: false,  */
        width: 302,
        async:false,
       /*  foreignObjectRendering:true, */
        useCORS:true,
        dpi:300,
        scale:2
      }).then((canvas) => {
        var imgData = canvas.toDataURL("image/png");
        this.img = imgData;
        this.show = false;
      });
    },
    getBase64() {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.src = require("../../assets/img/hb.jpg");
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 302.41, 150);
        let imgUrl = canvas.toDataURL("image/jpeg");
        let imgs = document.getElementById("hb");
        imgs.src = imgUrl;
      };
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
  .qr_img {
    width: 100%;
   
    border-radius: 0.15rem;
  }
  .qr_box {
    background: white;
    border-radius: 0.15rem;
    #can_img {
      width: 100%;
      height: 9rem;
      border-radius: 0.15rem;
    }
  }
  .img {
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
.url_bottom_box {
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  box-sizing: border-box;
  padding: 0.4rem 0;
}
.url_title {
  box-sizing: border-box;
  padding: 0 0.4rem;
}
.icon {
  width: 0.8rem;
  height: 0.05rem;
  background-color: white;
}
</style>