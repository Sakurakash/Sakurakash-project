<template>
    <transition @enter="enter" @leave="leave" :css="false">
        <div class="normal-player" v-show="this.isFullScreen">
            <div class="player-wrapper">
                <playerHeader></playerHeader>
                <playerMiddle :currentTime="currentTime"></playerMiddle>
                <playerBottom :totalTime="totalTime" :currentTime="currentTime"></playerBottom>
            </div>
            <div class="player-bg">
                <img :src="currentSong.picUrl">
            </div>
            <div class="player-bg2"></div>
        </div>
    </transition>
</template>

<script>
import playerHeader from './PlayerHeader.vue'
import playerMiddle from './PlayerMiddle.vue'
import playerBottom from './PlayerBottom.vue'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'NormalPlayer',
    components: {
        playerHeader,
        playerMiddle,
        playerBottom
    },
    computed: {
        ...mapGetters([
            'isFullScreen',
            'currentSong'
        ])
    },
    methods: {
        ...mapActions([
            'setSongLyric'
        ]),
        enter (el, done) {
            Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
                done()
            })
        },
        leave (el, done) {
            Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
                done()
            })
        }
    },
    watch: {
        currentSong (newValue) {
            if (newValue.id === undefined) {
                return
            }
            this.setSongLyric(newValue.id)
        }
    },
    props: {
        totalTime: {
            type: Number,
            default: 0,
            required: true
        },
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
.normal-player{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
    .player-wrapper{
        width: 100%;
        height: 100%;
    }
    .player-bg{
        opacity: 0.8;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        img{
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            filter: blur(20px);
        }
    }
    .player-bg2{
        opacity: 0.4;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
    }
}
</style>
