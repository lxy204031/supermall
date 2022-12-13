<template>
  <div class="homeSwiper">
    <my-swiper :banners="banners"></my-swiper>
  </div>
</template>

<script>
import MySwiper from "@/components/common/swiper/MySwiper";

export default {
  name: "HomeSwiper",
  components: {
    MySwiper
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
</style>
