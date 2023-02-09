<template>
  <div>
   <nav-bar class="nav-bar">
    <div slot="center">购物车({{cartLength}})</div>
   </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue"
import { mapGetters } from 'vuex'


export default {
  name: "Cart",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
  data() {
    return {
      x: 0
    }
  },
  methods: {
  
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
}
</style>