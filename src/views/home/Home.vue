<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @positionChange="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <home-recommend-view :recommends="recommends" />
      <feature-view @featureViewLoad="featureViewLoad" />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="clickBack" v-show="isBackTop" />
  </div>
</template>

<script>
// 公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";

// 首页组件
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import featureView from "@/views/home/childComps/FeatureView";

// 导入的方法
import { getHomeMultidata, getHomeGoods } from "@/network/home";
import { itemListenerMixin } from "@/common/mixin";

export default {
  name: "Home",
  mixins: [itemListenerMixin],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    featureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      type: "pop",
      isBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    // 网络请求使用封装的函数
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 转移到mixin里面了
    // 图片加载完成的事件监听
    // 这里不加括号，加了括号得到是方法的返回值而不是方法
    // const refresh = debounce(this.$refs.scroll.refresh, 300);
    // this.itemImgListener = () => {
    //   // refresh非常频繁，进行防抖处理
    //   refresh();
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener);

    // 获取tabControl
    // 所有的组件都有一个属性$el:用于获取组件中的元素
    this.$bus.$on("swiperImgLoad", () => {
      console.log("swiperImgLoad");

      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log("//////", this.tabOffsetTop);
    });
  },
  beforeDestroy() {
    this.$bus.$off("itemImageLoad");
    this.$bus.$off("swiperImgLoad");
  },
  activated() {
    // 滚动前先刷新一下
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 1. 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    console.log(this.saveY);
    // 2. 取消全局监听事件
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  destroyed() {
    console.log("Home Destroyed");
  },
  computed: {
    showGoods() {
      return this.goods[this.type].list;
    },
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.type = "pop";
          break;
        case 1:
          this.type = "new";
          break;
        case 2:
          this.type = "sell";
          break;
      }

      // 两个tabControl保持一致
      if (this.$refs.tabControl1 !== undefined) {
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      }
      // this.$refs.scroll.scrollTo(0, -this.tabOffsetTop)
    },
    // 返回顶部
    clickBack() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 监听滚动
    contentScroll(position) {
      // 判断是否显示backTop
      this.isBackTop = position.y < 0;

      // 决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      console.log("加载更多");
      this.getHomeGoods(this.type);
    },
    featureViewLoad() {
      console.log("featureViewLoad");
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        // console.log(res.data);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 下拉到底部只能监听一次，因此每次下拉后都要调用finishPullUp方法来结束一次下拉操作
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
/* scoped:作用域，只对当前组件起效果 */
.home-nav {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;

  /*导航固定在顶端（使用浏览器原生滚动时）*/
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  /*z-index 属性设置元素的堆叠顺序，只对定位了的元素（position）起效果。
    拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。*/
  /* z-index: 9; */
}
#home {
  /* padding-top: 44px; */
  /* viewport view 视口高度 */
  height: 100vh;
  position: relative;
}

/*不是每次使用这个组件都需要吸顶效果，所以不在组件里写样式*/
/* (注：原生滚动可以吸顶，使用better-scroll后，无效) */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

/* 确定中间滚动部分高度，方法一： */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

/* 确定中间滚动部分高度，方法二： */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
