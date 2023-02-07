<template>
  <div class="detail">
    <detail-nav-bar />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <detail-params-info :paramInfo="itemParams" />
      <detail-comment-info :commentInfo="commentInfo" />
      <p>推荐</p>
      <goods-list :goods="recommend" />
    </scroll>
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
import { getDetail, getRecommend, Goods, Shop, GoodsParams } from "@/network/detail";
import { itemListenerMixin } from "@/common/mixin"

export default {
  name: "Detail",
  mixins: [itemListenerMixin],
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
  },
  methods: {
    //
    imgLoad() {
      this.$refs.scroll.refresh();
    },
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
    });
    getRecommend().then((res) => {
      console.log("recommend", res);
      this.recommend = res.data.list;
    });
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }
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
  height: calc(100% - 44px);
}
.content p {
  font-size: 15px;
  padding: 20px 15px;
}
</style>
