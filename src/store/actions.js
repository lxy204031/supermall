import { ADD_COUNTER, ADD_TO_CART } from './mutations-types';

export default {
  // 只进行判断，更改放在mutations
  addCart(context, payload) {
    // payload新添加的商品
    let oldProduct = null
    // for (let item of state.cartList) {
    //   // 判断是否已有该商品
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // 查找购物车中是否已有添加的商品
    oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  },
  handelCheck(context, payload) {
    const index = context.state.cartList.findIndex(item => item.iid === payload)
    context.commit("checkChange", index)
  }
}