import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex)

const state = {
  cartList: [{ "image": "//s11.mogucdn.com/p2/170301/106341701_4kfgdd3001475k8h1l365al2k5ed6_640x960.jpg", "title": "2018 新款女装上衣文艺棉麻短袖t恤 V领衫T恤女短袖女T桖", "desc": "建议零售价\t¥129.00\t\n面料名称\t奥戴尔\t主面料成分\t棉\t主面料成分的含量\t95（%）\n图案\t纯色\t风格\t文艺\n款式\t套头\t袖长\t短袖\t工艺\t拼贴/拼接     88803", "price": "56.64", "iid": "1jw0sr2", "checked": true, "count": 1 }, { "image": "//s11.mogucdn.com/mlcdn/c45406/180301_1cik8f3fj0gf2839ddch880422ffc_640x960.jpg", "title": "【2件69元】【新品特惠】短袖t恤女2018夏装新款韩版学生宽松黑色体恤圆领纯棉半袖上衣服", "desc": "【2件69元】【新品特惠】【赠送运费险 七天无理由退换货】【无忧售后】", "price": "49.00", "iid": "1lrzvr8", "checked": true, "count": 1 }, { "image": "//s5.mogucdn.com/mlcdn/c45406/180827_1590j44g2bk619i6655ji20ihikfb_640x960.jpg", "title": "秋装女2018新款套装时尚晚晚风气质chic港味女神网红两件套装俏皮", "desc": "秋装女2018新款套装时尚晚晚风气质chic港味女神网红两件套装俏皮", "price": "109.00", "iid": "1m7rp9w", "checked": true, "count": 1 }]
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
