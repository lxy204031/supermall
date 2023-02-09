import { ADD_COUNTER, ADD_TO_CART } from './mutations-types';
export default {
  // mutations的唯一目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的时间比较单一一点

  // 对state的更改抽离到这里
  [ADD_COUNTER](state, payload) {
    payload.count ++
  },
   [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
   }
}