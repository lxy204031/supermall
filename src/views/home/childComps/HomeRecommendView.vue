<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return[]
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    /*上 左右 下*/
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;

  }

  .recommend-item {
    flex: 1px;
  }

  .recommend-item img {
    width: 75%;
  }

  .recommend-item div {
    padding-top: 2px;
  }
</style>
