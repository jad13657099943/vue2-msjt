import vue from '../../main';
export default {
  //商品价格为0显示免费
  free(val) {
    if (val <= 0) {
      val = "免费";
    } else {
      val = "¥" + val;
    }
    return val;
  },
  //线上线下课程跳转
  toCurDetail(id, state) {
    if (state == 1) {
      vue.$router.push({
        path: '/cur/shang',
        query: {
          id: id
        }
      });
    }
    if (state == 2) {
      vue.$router.push({
        path: '/cur/xia',
        query: {
          id: id
        }
      });
    }
  },
  //订单状态
  getStatusText(val) {
    let text = "订单异常";
    switch (val) {
      case '1':
        text = "待付款";
        break;
      case '2':
        text = "待发货";
        break;
      case '3':
        text = "已取消";
        break;
      case '4':
        text = "待收货";
        break;
      case '6':
        text = "已完成";
        break;
      case '7':
        text = "已退款";
        break;
    }
    return text;
  },
  //售后状态
  getSaleStatusText(val) {
    let text = '订单异常';
    switch (val) {
      case '1':
        text = '待审核';
        break;
      case '2':
        text = '已取消';
        break;
      case '3':
        text = '已拒绝';
        break;
      case '4':
        text = '退款成功';
        break;
    }
    return text;
  },
  //课程订单状态
  getCurStatusText(val){
    let text ='订单异常';
    switch(val){
      case '1':
        text='待支付';
        break;
        case '2':
          text='已付款';
          break;
    }
    return text;
  },
  //跳转
  toPath(val){
    vue.$router.push(val);
  }
}