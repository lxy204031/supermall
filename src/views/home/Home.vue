<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @positionChange="isShowBackTop"
      @pullUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="titles" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="clickBack" v-show="showBackTop" />
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

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    featureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      type: "pop",
      showBackTop: false
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
    // 这里不加括号，加了括号得到是方法的返回值而不是方法
    const refresh = this.debounce(this.$refs.scroll.refresh) 
    this.$bus.$on("itemImageLoad", () => {
      // refresh非常频繁，进行防抖处理
      refresh();
    });
  },
  beforeDestroy() {
    this.$bus.$off("itemImageLoad");
  },
  computed: {
    showGoods() {
      return this.goods[this.type].list;
    }
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

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
    },
    clickBack() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0);
    },
    isShowBackTop(position) {
      // if (position.y < 0) {
      //   this.showBackTop = true
      // } else {
      //   this.showBackTop = false
      // }
      this.showBackTop = position.y < 0;
    },
    loadMore() {
      // console.log("下拉加载");
      this.getHomeGoods(this.type);
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res;
        // console.log(res.data);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
/* scoped:作用域，只对当前组件起效果 */
.home-nav {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;

  /*导航固定在顶端*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  /*z-index 属性设置元素的堆叠顺序。
    拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。*/
  z-index: 9;
}
#home {
  /* padding-top: 44px; */
  /* viewport view 视口高度 */
  height: 100vh;
  position: relative;
}

/*不是每次使用这个组件都需要吸顶效果，所以不在组件里写样式*/
/* (注：原生滚动可以吸顶，使用better-scroll后，无效) */
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

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
</style>
