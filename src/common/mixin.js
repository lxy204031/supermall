import { debounce } from "@/common/utils";
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