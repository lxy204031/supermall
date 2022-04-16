import axios from "axios";
// 将网络请求axios框架封装


export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

//  2. axios的拦截器
//  2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

//  2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

//  3. 发送真正的网络请求
//  返回的就是Promise
  return instance(config)
}
