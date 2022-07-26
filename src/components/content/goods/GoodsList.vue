<template>
  <div class="goods">

  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem.vue";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>