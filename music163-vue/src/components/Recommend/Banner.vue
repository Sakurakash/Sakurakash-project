<template>
    <swiper :options="swiperOption" class="banner">
        <swiper-slide class="item" v-for="{bannerId, pic, url} in banners" :key="bannerId">
            <a :href="url">
                <img :src="pic">
            </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
    name: 'Banner',
    data () {
        return {
            swiperOption: {
                speed: 600, // 切换速度
                loop: true, // 循环模式选项
                autoplay: {
                    delay: 2500, // 自动切换的时间间隔，单位ms
                    stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
                    disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
                },
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination'
                },
                observer: true,
                observeParents: true,
                observeSlideChildren: true
            }
        }
    },
    props: {
        banners: {
            type: Array,
            default: () => [],
            required: true
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    }
}
</script>

<style scoped lang="scss">
.banner{
    .item{
        img{
            width: 100%;
            height: 300px;
        }
    }
    .swiper-pagination-bullet{
        width: 16px;
        height: 16px;
        background: #fff;
        opacity: 1;
    }
}
</style>
<!--设置scoped时,样式无法穿透,所以需要单独设置-->
<style lang="scss">
@import "../../assets/css/mixin";
.banner{
    .swiper-pagination-bullet{
        width: 16px;
        height: 16px;
        background: #fff;
        opacity: 1;
    }
    .swiper-pagination-bullet-active{
        @include bg_color();
    }
}
</style>
