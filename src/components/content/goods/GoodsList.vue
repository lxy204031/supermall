<template>
  <div class="goods">
    <goods-list-item class="goods=item" v-for="(item, index) in goods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem.vue";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
  .goods {
    display: flex;
    /* 包裹：先设置组件的宽度，随后根据组件宽度来决定一行显示多少个*/
    flex-wrap: wrap;
    /* 水平分散，不靠边，水平等距分散 */
    justify-content: space-around;
    padding: 2px;
  }

</style>