<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    // 1.创建BScroll对象
    // 类名会有重复，通过类名找到元素不可取，因此设置ref
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 内部点击事件默认不可用
      click: true,
      probeType: this.probeType,
      pullUpLoad: true
    });

    // 2.监听滚动的位置
    this.scroll.on("scroll", position => {
      // console.log(position)
      this.$emit("positionChange", position);
    });

    // 3.监听上拉
    this.scroll.on("pullingUp", () => {
      console.log("下拉加载");
      this.$emit("pullUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
      // this.scroll?.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      console.log("-------");
    }
  }
};
</script>