<!--<template>-->
<!--  <swiper-->
<!--    :autoplay="swiper_option.autoplay"-->
<!--    :loop="swiper_option.loop"-->
<!--    :speed="swiper_option.speed"-->
<!--    :pagination="swiper_option.pagination"-->
<!--  >-->
<!--    <swiper-slide>Slide 1</swiper-slide>-->
<!--    <swiper-slide>Slide 2</swiper-slide>-->
<!--    <swiper-slide>Slide 3</swiper-slide>-->
<!--  </swiper>-->
<!--</template>-->

<!--<script>-->
<!--import {reactive } from "vue";-->
<!--import { Swiper, SwiperSlide } from "swiper/vue";-->
<!--import SwiperCore, {Autoplay, Pagination} from "swiper"-->
<!--import "swiper/swiper.min.css";-->
<!--SwiperCore.use([Autoplay, Pagination])-->

<!--export default {-->
<!--  name: "Home",-->
<!--  components: {-->
<!--    Swiper,-->
<!--    SwiperSlide,-->
<!--  },-->
<!--  setup() {-->
<!--    const swiper_option = reactive({-->
<!--      autoplay: {-->
<!--        delay: 3000,-->
<!--        disableOnInteraction: false-->
<!--      },-->
<!--      loop: true,-->
<!--      speed: 1000,-->
<!--      pagination: {-->
<!--        clickable: true-->
<!--      }-->
<!--    })-->
<!--    return {-->
<!--      swiper_option-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
<template>
  <div class="mySwiper">
    <swiper v-if="banners.length > 1" :options="swiperOpt">
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <img :src="item.image || item" @load="imgLoad" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// 这两步很重要，分页和轮播，还包括一些其他的
import Swiper2, { Pagination, Autoplay } from "swiper";
Swiper2.use([Pagination, Autoplay]);

// import swiper module styles
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css"; // 影响小圆点

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOpt: {
        loop: true,
        observer: true, //修改swiper本身或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      isLoad: false,
    };
  },
  // computed: {
  //   swiper() {
  //     return this.$refs.mySwiper;
  //   }
  // },
  mounted() {},
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$bus.$emit("swiperImgLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>
<style scoped>
.swiper-slide img {
  width: 100%;
}
/*pagination默认的小圆点颜色蓝色怎么也修改不了，css覆写也没用，
尝试了一下sass的穿透覆写css
要注意头部要写 /deep/关键字*/
/deep/ .swiper-pagination-bullet-active {
  background: deeppink;
}
</style>
