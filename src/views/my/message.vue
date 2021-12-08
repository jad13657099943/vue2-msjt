<template>
  <div>
    <back title="意见反馈"></back>
    <div class="message_box">
      <div class="content_box">
        <textarea
          maxlength="50"
          v-model="params.content"
          placeholder="请在此描述你的建议或反馈，我们会尽快为你处理的哦~(必填)"
          class="text"
        ></textarea>
        <div class="text_num">{{ params.content.length }}/50</div>
        <div class="xian"></div>
        <div class="img_box">
          <van-uploader
            preview-size="2.5rem"
            v-model="fileList"
            multiple
            :max-count="3"
          >
            <div class="img_info">
              <div class="iconfont icon-zhaoxiangji"></div>
              <div class="upload_title">上传图片</div>
            </div>
          </van-uploader>
          <div class="img_msg" v-if="fileList.length < 1">最多上传三张图片</div>
        </div>
      </div>
      <div class="message_submit" @click="sumbit">提交</div>
    </div>
  </div>
</template>

<script>
import back from "../../components/back/back.vue";
import { Toast, Uploader } from "vant";
import { MessageSet, UploadImg } from "../../require/api";
export default {
  components: {
    back,
    vanUploader: Uploader,
  },

  data() {
    return {
      fileList: [],
      cimages: [],
      params: {
        content: "",
        cimages: "",
      },
    };
  },
  methods: {
    async setFrom() {
      if (this.cimages.length > 0) {
        this.params.cimages = this.cimages.join(",");
      }
      let res = await MessageSet(this.params);
      console.log(`res`, res);
      if (res.code == 200) {
        Toast(res.msg);
        setTimeout(() => {
          this.$router.go(-1);
        }, 1500);
      }
    },
    sumbit() {
      if (!this.params.content) {
        Toast("请输入反馈信息");
      } else {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        let arr = [];
        if (this.fileList.length > 0) {
          this.fileList.forEach((item) => {
            let data = new FormData();
            data.append("file", item.file);
            arr.push(UploadImg(data));
          });
          console.log(`arr`, arr);
          Promise.all(arr).then((res) => {
            console.log(`res`, res);
            res.forEach((item) => {
              this.cimages.push(item.data);
            });
            this.$set(this.params, "cimages", this.cimages);
            this.setFrom();
          });
        } else {
          this.setFrom();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.message_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem;

  .content_box {
    border-radius: 0.15rem;
    background: #f8f8f8;
    box-sizing: border-box;
    padding: 0.4rem;
    .text {
      border: none;
      width: 100%;
      height: 3rem;
      background: #f8f8f8;
      font-size: 0.35rem;
    }
    .text_num {
      position: absolute;
      right: 0.8rem;
      top: 4.5rem;
      color: #999999;
    }
    .img_box {
      width: 100%;
      box-sizing: border-box;
      padding: 0.4rem 0 0 0;
      display: flex;
      display: -webkit-flex;
      .img_info {
        width: 2.5rem;
        height: 2.5rem;
        border: 0.02rem dashed #999999;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #999999;
        .iconfont {
          font-size: 1rem;
        }
      }
      .img_msg {
        color: #999999;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        margin-left: 0.4rem;
      }
    }
  }
  .message_submit {
    text-align: center;
    line-height: 1rem;
    width: 100%;
    height: 1rem;
    background: #ff8cce;
    color: white;
    border-radius: 0.45rem;
    font-size: 0.45rem;
    margin-top: 0.8rem;
  }
}
/deep/ .van-uploader__preview {
  margin-right: 0.4rem;
}
/deep/ .van-uploader__preview:nth-child(3) {
  margin-right: 0;
}
</style>