<template>
<!-- 只有一个插槽，以及对TabBar样式的定义 -->
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /*加阴影：x轴偏移量，y轴偏移量，阴影宽度，颜色*/
  box-shadow: 0 -3px 10px rgba(100, 100, 100, .4);
}
</style>
