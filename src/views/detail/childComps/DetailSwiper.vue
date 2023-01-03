<template>
  <div>
    <my-swiper :banners="topImages" class="detail-swiper"></my-swiper>
  </div>
</template>

<script>
import MySwiper from "@/components/common/swiper/MySwiper";
export default {
  components: {
    MySwiper,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
/deep/ .swiper-container {
  height: 300px;
}
</style>
