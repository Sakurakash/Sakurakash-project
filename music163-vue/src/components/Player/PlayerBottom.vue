<template>
    <div class="player-bottom">
        <div class="bottom-progress">
            <span ref="eleCurrentTime">00:00</span>
            <div class="progress-bar" @click="progressClick" ref="progressBar">
                <div class="progress-line" ref="progressLine">
                    <div class="progress-dot"></div>
                </div>
            </div>
            <span ref="eleTotalTime">00:00</span>
        </div>
        <div class="bottom-control">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <div class="prev" @click="prev"></div>
            <div class="play" @click="play" ref="play"></div>
            <div class="next" @click="next"></div>
            <div class="favorite" @click="favorite" :class="{'active': isFavorite(currentSong)}"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
import { formatTime } from '@/tools/tools'
export default {
    name: 'PlayerBottom',
    methods: {
        ...mapActions([
            'setIsPlaying',
            'setModeType',
            'setCurrentIndex',
            'setCurrentTime',
            'setFavoriteSong'
        ]),
        play () {
            if (this.currentSong.url) {
                this.setIsPlaying(!this.isPlaying)
            }
        },
        prev () {
            this.setCurrentIndex(this.currentIndex - 1)
        },
        next () {
            this.setCurrentIndex(this.currentIndex + 1)
        },
        mode () {
            if (this.modeType === modeType.loop) {
                this.setModeType(modeType.one)
            } else if (this.modeType === modeType.one) {
                this.setModeType(modeType.random)
            } else if (this.modeType === modeType.random) {
                this.setModeType(modeType.loop)
            }
        },
        favorite () {
            this.setFavoriteSong(this.currentSong)
        },
        isFavorite (song) {
            const result = this.favoriteList.find(function (currentValue) {
                return currentValue.id === song.id
            })
            return result !== undefined
        },
        progressClick (e) {
            const normalLeft = this.$refs.progressBar.offsetLeft
            const eventLeft = e.pageX
            const clickLeft = eventLeft - normalLeft
            const progressWidth = this.$refs.progressBar.offsetWidth
            const value = clickLeft / progressWidth
            this.$refs.progressLine.style.width = value * 100 + '%'

            const currentTime = this.totalTime * value
            this.setCurrentTime(currentTime)
        }
    },
    computed: {
        ...mapGetters([
            'isPlaying',
            'modeType',
            'currentIndex',
            'currentSong',
            'favoriteList'
        ])
    },
    watch: {
        isPlaying (newValue) {
            if (newValue) {
                this.$refs.play.classList.add('active')
            } else {
                this.$refs.play.classList.remove('active')
            }
        },
        modeType (newValue) {
            if (newValue === modeType.loop) {
                this.$refs.mode.classList.remove('random')
                this.$refs.mode.classList.add('loop')
            } else if (newValue === modeType.one) {
                this.$refs.mode.classList.remove('loop')
                this.$refs.mode.classList.add('one')
            } else if (newValue === modeType.random) {
                this.$refs.mode.classList.remove('one')
                this.$refs.mode.classList.add('random')
            }
        },
        totalTime (newValue) {
            const time = formatTime(newValue)
            this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
        },
        currentTime (newValue) {
            const time = formatTime(newValue)
            this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
            const value = newValue / this.totalTime * 100
            this.$refs.progressLine.style.width = value + '%'
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
.player-bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    .bottom-progress{
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            @include font_size($font_small);
            color: #fff;
        }
        .progress-bar{
            width: 100%;
            margin: 0 10px;
            height: 10px;
            background: #ccc;
            .progress-line{
                width: 0;
                height: 100%;
                background: #fff;
                position: relative;
                .progress-dot{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #fff;
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    .bottom-control{
        width: 80%;
        margin: 0 auto;
        padding: 50px 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.1);
        div{
            width: 84px;
            height: 84px;
        }
        .mode{
            &.loop{
                @include bg_img('../../assets/images/loop');
            }
            &.one{
                @include bg_img('../../assets/images/one');
            }
            &.random{
                @include bg_img('../../assets/images/shuffle');
            }
        }
        .prev{
            @include bg_img('../../assets/images/prev');
        }
        .play{
            @include bg_img('../../assets/images/play');
            &.active{
                @include bg_img('../../assets/images/pause');
            }
        }
        .next{
            @include bg_img('../../assets/images/next');
        }
        .favorite{
            @include bg_img('../../assets/images/un_favorite');
            &.active{
                @include bg_img('../../assets/images/favorite');
            }
        }
    }
}
</style>
