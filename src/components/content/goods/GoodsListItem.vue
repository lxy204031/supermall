<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="cfav">☆ {{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    imageLoad() {
      // 这个组件在多个地方使用，在detail中使用时发射的全局事件，
      // home中也会监听并回调一些函数，这是不对的
      // 解决方法有两种：
      // 1. 通过路由控制发射不同的全局事件，不同路由监听不同的全局事件：
      // if (this.$route.path.indexOf("/home") !== -1) {
      //   this.$bus.$emit("homeItemImageLoad");
      // } else if (this.$route.path.indexOf("/detail") !== -1) {
      //   this.$bus.$emit("detailItemImageLoad");
      // }
      // 2. 只发送一个全局事件，但是不同组件使用时要及时取消监听
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      console.log("跳转详情页");
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  /* 相对定位 */
  position: relative;
  /* 固定宽度 */
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  /* 绝对定位 */
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
/* .goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("@/assets/img/common/collect.svg") 0 0/14px 14px;
} */
</style>
