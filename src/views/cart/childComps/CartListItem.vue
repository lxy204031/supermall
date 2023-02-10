<template>
  <div class="shop-item">
    <div class="item-selector">
      <CheckButton @checkBtnClick="checkedChange" :value="product.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">×{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "@/components/content/checkButton/CheckButton.vue";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkedChange() {
      // this.product.checked = !this.product.checked
      this.$store.dispatch('handelCheck', this.product.iid)
      console.log("this.product.checked", this.product.checked);
    }
  }
};
</script>
<style scoped>
.shop-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 18px;
  color: #333;
  padding: 10px 10px;
  position: relative;
  overflow: hidden;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  position: absolute;
  bottom: 0px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  font-size: 18px;
  color: orangered;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}
</style>
