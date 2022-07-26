// 在这里进行首页的网络请求
import {request} from "@/network/request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 在这里进行首页商品的网络请求
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
