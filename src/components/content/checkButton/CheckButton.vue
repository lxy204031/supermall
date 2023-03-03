<template lang="">
  <div :class="{checkBotton: true, active: value}" @click="onClick"> <img src="@/assets/img/cart/tick.svg" style="margin-top: 1px; color: transparent " alt=""> </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    value: ''
  },
  methods: {
    onClick() {
      this.$emit("checkBtnClick")
    }
  }
};
</script>
<style scoped>
.checkBotton {
  border: 1px solid #ccc;
  width: 20px;
  height: 20px;
  border-radius: 20px;
}
.active {
  background: var(--color-tint);
}
</style>
