<template>
    <swiper :options="swiperOption" class="banner">
        <swiper-slide class="cd">
            <div class="cd-wrapper" ref="cdWrapper">
                <img :src="currentSong.picUrl" alt="">
            </div>
            <p>{{ getLyricText (currentLineNum) }}</p>
        </swiper-slide>
        <swiper-slide class="lyric" ref="lyric">
            <ScrollView ref="scrollView">
                <ul>
                    <li v-for="(value, index) in currentLyric" :key="index" :class="{'active': currentLineNum === index}"> {{ value }}</li>
                </ul>
            </ScrollView>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ScrollView from '../ScrollView.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'PlayerHeader',
    data () {
        return {
            swiperOption: {
                speed: 600, // 切换速度
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    bulletClass: 'my-bullet',
                    bulletActiveClass: 'my-bullet-active'
                },
                observer: true,
                observeParents: true,
                observeSlideChildren: true
            },
            currentLineNum: 0
        }
    },
    components: {
        Swiper,
        SwiperSlide,
        ScrollView
    },
    directives: {
        swiper: directive
    },
    computed: {
        ...mapGetters([
            'isPlaying',
            'currentSong',
            'currentLyric'
        ])
    },
    watch: {
        isPlaying (newValue) {
            if (newValue) {
                this.$refs.cdWrapper.classList.add('active')
            } else {
                this.$refs.cdWrapper.classList.remove('active')
            }
        },
        currentTime (newValue) {
            const lineNum = Math.floor(newValue) + ''
            this.currentLineNum = this.getActiveLineNum(lineNum)
            if (document.querySelector('li.active')) {
                const currentLyricTop = document.querySelector('li.active').offsetTop
                const lyricHeight = this.$refs.lyric.$el.offsetHeight
                if (currentLyricTop > lyricHeight / 2) {
                    this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
                }
            }
        },
        currentLyric (newValue) {
            this.currentLineNum = Object.keys(newValue)[0]
        }
    },
    methods: {
        getActiveLineNum (lineNum) {
            if (lineNum < 0) {
                return this.currentLineNum
            }
            const result = this.currentLyric[lineNum + '']
            if (result === undefined || result === '') {
                lineNum--
                return this.getActiveLineNum(lineNum)
            } else {
                return lineNum + ''
            }
        },
        getLyricText (index) {
            return this.currentLyric[index]
        }
    },
    props: {
        currentTime: {
            type: Number,
            default: 0,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.banner{
    position: fixed;
    top: 150px;
    bottom: 250px;
    left: 0;
    right: 0;
    .cd{
        .cd-wrapper{
            display: block;
            margin: 200px auto;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            border: 30px solid #fff;
            overflow: hidden;
            animation: sport 3s linear infinite;
            animation-play-state: paused;
            &.active{
                animation-play-state: running;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        p{
            text-align: center;
            @include font_size($font_medium);
            color: #ccc;
            margin-top: 50px;
        }
    }
    .lyric{
        li{
            text-align: center;
            @include font_size($font_medium);
            color: #ccc;
            margin: 10px 0;
            &:first-of-type{
                padding-top: 50%;
            }
            &:last-of-type{
                padding-bottom: 100%;
            }
            &.active{
                color: #fff;
            }
        }
    }
}
@keyframes sport {
    from{
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>
<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    margin: 0 20px;
}
.my-bullet-active{
    width: 60px;
    @include bg-color();
}
</style>
