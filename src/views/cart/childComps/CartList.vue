<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Scroll from '@/components/common/scroll/Scroll.vue';
import CartListItem from './CartListItem.vue'

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  
  activated() {
    // 解决不能滚动的问题，内容更改了要刷新
    this.$refs.scroll.refresh()
  }
};
</script>
<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px);
}
.content {
  height: calc(100% - 49px);
  overflow: hidden;
}
</style>
