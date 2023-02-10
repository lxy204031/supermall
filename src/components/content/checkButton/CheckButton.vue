<template lang="">
  <div :class="{checkBotton: true, active: value}" @click="onClick"> <img src="@/assets/img/cart/tick.svg" alt=""> </div>
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
  width: 18px;
  height: 18px;
  border-radius: 18px;
}
.active {
  background: var(--color-tint);
}
</style>
