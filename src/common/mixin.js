import { debounce } from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop.vue";

export const itemListenerMixin = {
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 300);
        this.itemImgListener = () => {
            refresh();
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    data() {
        return {
            itemImgListener: null
        }
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isBackTop: false,
        }
    },
    methods: {
        // 返回顶部
        clickBack() {
            // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
            this.$refs.scroll.scrollTo(0, 0);
        },
    },
}