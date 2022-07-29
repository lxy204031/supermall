<template>
  <div class="tabControl">
    <div v-for="(item, index) in titles"
         :key="index"
         class="tabControl-item"
         :class="{active: index===currentIndex}"
         @click="selected(index)">
      <span>
        {{item}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    selected(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .tabControl {
    display: flex;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    background-color: #fff;
  }

  .tabControl-item {
    flex: 1px;
  }

  .tabControl-item span {
    padding: 3px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
