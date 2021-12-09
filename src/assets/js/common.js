export default {
    //时间戳转日期 type=1年月日 大于1 精确时分秒
    changeTime(timestamp, type = 1) {
      if (timestamp.toString().length <= 10) {
        timestamp = timestamp * 1000;
      }
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  
      let Y = date.getFullYear() + '-';
  
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  
      let D = date.getDate() + ' ';
  
      if (type > 1) {
        let h = date.getHours() + ':';
  
        let m = date.getMinutes() + ':';
  
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
      }
      return Y + M + D
  
    },
    //验证手机号格式
    isMobile(val) {
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      return myreg.test(val);
    },
    //值是否存在于数组
    inArray(val, array) {
      for (let i = 0; i < array.length; i++) {
        if (val === array[i]) {
          return true;
        }
      }
      return false;
    },
    //验证身份证
    isCard(val) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return reg.test(val);
    },
    //截取小数点后两位
    keepTwo(val,length){
      val+="";
     return val.substring(0,val.indexOf('.')+(length+1))
    },
    //图片转base64
     getBase64(imgUrl) {
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      // 至关重要
      xhr.responseType = "blob";
      xhr.onload = function () {
      if (this.status == 200) {
      //得到一个blob对象
      var blob = this.response;
      console.log("blob", blob)
      // 至关重要
      let oFileReader = new FileReader();
      oFileReader.onloadend = function (e) {
      // 此处拿到的已经是 base64的图片了
      let base64 = e.target.result;
      return  base64;
      };
      oFileReader.readAsDataURL(blob);
      }
      }
      xhr.send();
      }
  }