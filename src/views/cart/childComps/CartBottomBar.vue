<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" />
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate">去结算({{checkLength}})</div>
  </div>
</template>
<script>
import CheckButton from "@/components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #f6f6f6;
  position: relative;
  bottom: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.check-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  line-height: 20px;
  margin-right: 5px;
}
.price {
  /* margin-left: 30px; */
}
.calculate {
  padding:0 10px;
  background: var(--color-tint);
}
</style>
