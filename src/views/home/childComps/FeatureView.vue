<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="@/assets/img/home/recommend_bg.jpg" alt="" @load="featureViewLoad">
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  methods: {
    featureViewLoad() {
      this.$emit('featureViewLoad')
    }
  }
}
</script>

<style scoped>
  .feature {
    text-align: center;
  }
  .feature img {
    width: 100.5%;
  }
</style>
