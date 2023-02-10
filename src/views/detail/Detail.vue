<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="navBar" />
    <scroll class="content" ref="scroll" @positionChange="positionChange" :probeType="2">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <detail-params-info ref="params" :paramInfo="itemParams" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <p>推荐</p>
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="clickBack" v-show="isBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue"
import { getDetail, getRecommend, Goods, Shop, GoodsParams } from "@/network/detail";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: "", // 商品id
      topImages: [], // 商品轮播图
      goods: {}, // 商品信息
      shop: {}, // 商铺信息
      detailInfo: {}, // 商品详情
      itemParams: {}, // 商品参数
      commentInfo: {}, // 商品评价
      recommend: [], // 推荐商品列表
      themeTopYs: [], // 距离顶部位置，用于标题点击定位
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); // 添加一个js可以表示的最大的数
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    positionChange(position) {
      // console.log(position.y);
      // 常规版
      // if (position.y > -this.themeTopYs[1]) {
      //   this.$refs.navBar.currentIndex = 0;
      //   console.log("0");
      // } else if (position.y <= -this.themeTopYs[1] && position.y > -this.themeTopYs[2]) {
      //   this.$refs.navBar.currentIndex = 1;
      //   console.log("1");
      // } else if (position.y <= -this.themeTopYs[2] && position.y > -this.themeTopYs[3]) {
      //   this.$refs.navBar.currentIndex = 2;
      // } else if (position.y <= -this.themeTopYs[3]) {
      //   this.$refs.navBar.currentIndex = 3;
      // }

      // 判断条件集中版
      // var length = this.themeTopYs.length;
      // var positionY = -position.y;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.$refs.navBar.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.$refs.navBar.currentIndex = i;
      //   }
      // }

      // 简化版（需要在数组中添加一个非常大的值，统一判断条件，用空间换时间）
      var length = this.themeTopYs.length;
      var positionY = -position.y;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.$refs.navBar.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.$refs.navBar.currentIndex = i;
        }
      }

      // 判断是否显示backTop
      this.isBackTop = position.y < 0;
    },

    addToCart() {
      // 1,获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      product.checked = true

      // 2.将商品添加到购物车里
      // this.$store.cartList.push(product) 不能这样写
      this.$store.dispatch('addCart', product)
    }
  },
  created() {
    // 注意：由于使用了keep-alive，created只触发一次，
    // 因此只接受一次参数导致点击不同的商品接受到的参数相同，
    // 解决方法有两个：
    // 1. 使用keep-alive的exclude属性
    // 2. 使用activated方法，每次页面激活时都会调用
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      console.log("data", data);
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.itemParams = new GoodsParams(data.itemParams.info, data.itemParams.rule);
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 解决方法二：使用this.$nextTick，所有DOM渲染完成后回调函数
      // this.$nextTick(() => {
      //   // 还是不行，因为图片没加载完
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    getRecommend().then((res) => {
      console.log("recommend", res);
      this.recommend = res.data.list;
    });
  },
  mounted() {
    // 得到的是undefined，
    // 因为数据传给子组件有一定的延时，
    // 而且子组件主体渲染的条件是有数据，
    // 所以无数据就无法找到需要的DOM
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
  },
  updated() {
    // 解决方法一：放在update中，此时DOM渲染完成且更新的数据以渲染到DOM上
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
.detail {
  height: 100vh;
  background-color: #ffffff;
  position: relative;
  z-index: 1;
}
/* 要设置好固定的区域，才能滚动 */
.content {
  background-color: #ffffff;
  height: calc(100% - 44px - 58px);
}
.content p {
  font-size: 15px;
  padding: 20px 15px;
}
</style>
