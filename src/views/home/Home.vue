<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <my-swiper :banners="banners"></my-swiper>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import {getHomeMultidata} from "@/network/home";
  import MySwiper from "@/components/common/swiper/MySwiper";

  export default {
    name: "Home",
    components: {
      NavBar,
      MySwiper
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      // 网络请求使用封装的函数
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }
</style>
