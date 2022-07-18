<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 10px rgba(100, 100, 100, .4);
  }

  .left, .right {
    width: 60px;
  }

  .center {
    /*占据剩余部分（左右宽度确定）*/
    flex: 1;
  }
</style>
