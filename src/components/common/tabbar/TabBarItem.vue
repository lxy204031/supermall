<template>
  <!-- TabBar的里面的内容，两个插槽放图片和文字 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="img"></slot>
    </div>
    <div v-else>
      <slot name="img-active"></slot>
    </div>
    <!--    <div :class="{active: isActive}"><slot name="text"></slot></div>-->
    <div :style="activeStyle">
      <slot name="text"></slot>
    </div>
    <!--    <img src="../../assets/img/06-tabbar/home.svg" alt="">-->
    <!--    <div>首页</div>-->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "var(--color-tint)"
    }
  },
  data() {
    return {
      // isActive: false
    };
  },
  computed: {
    isActive() {
      // this.$route.path拿到处于活跃的路由(路径）
      // str.indexOf(subStr)判断字符串是否包涵子字符串
      // 返回值是子字符串在字符串中的index，没有则返回-1
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      // 跳转前先判断跳转的路径是否包含本次路劲
      if (!this.$route.path.includes(this.path)) {
        this.$router.replace(this.path);
      }
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 20px;
  height: 20px;
  margin-top: 4px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/*.active {*/
/*  color: deeppink;*/
/*}*/
</style>
