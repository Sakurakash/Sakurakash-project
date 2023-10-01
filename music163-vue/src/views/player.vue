<template>
    <div class="player">
        <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
        <MiniPlayer></MiniPlayer>
        <ListPlayer></ListPlayer>
        <audio :src="currentSong.url" ref="audio" @timeupdate="timeUpdate" @ended="end"></audio>
    </div>
</template>

<script>

import NormalPlayer from '../components/Player/NormalPlayer.vue'
import MiniPlayer from '../components/Player/MiniPlayer.vue'
import ListPlayer from '../components/Player/ListPlayer.vue'
import mode from '../store/modeType'
import { mapActions, mapGetters } from 'vuex'
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '@/tools/tools'

export default {
    name: 'player',
    components: {
        NormalPlayer,
        MiniPlayer,
        ListPlayer
    },
    computed: {
        ...mapGetters([
            'currentSong',
            'isPlaying',
            'currentIndex',
            'curTime',
            'modeType',
            'songs',
            'favoriteList',
            'historyList'
        ])
    },
    methods: {
        ...mapActions([
            'setCurrentIndex',
            'setFavoriteList',
            'setHistorySong',
            'setHistoryList'
        ]),
        timeUpdate (e) {
            this.currentTime = e.target.currentTime
        },
        end () {
            if (this.modeType === mode.loop) {
                this.setCurrentIndex(this.currentIndex + 1)
            } else if (this.modeType === mode.one) {
                this.$refs.audio.play()
            } else if (this.modeType === mode.random) {
                const index = getRandomIntInclusive(0, this.songs.length - 1)
                this.setCurrentIndex(index)
            }
        }
    },
    watch: {
        isPlaying (newValue) {
            if (newValue) {
                this.setHistorySong(this.currentSong)
                this.$refs.audio.play()
            } else {
                this.$refs.audio.pause()
            }
        },
        currentIndex () {
            this.$refs.audio.oncanplay = () => {
                this.totalTime = this.$refs.audio.duration
                if (this.isPlaying) {
                    this.setHistorySong(this.currentSong)
                    this.$refs.audio.play()
                } else {
                    this.$refs.audio.pause()
                }
            }
        },
        curTime (newValue) {
            this.$refs.audio.currentTime = newValue
        },
        favoriteList (newValue) {
            setLocalStorage('favoriteList', newValue)
        },
        historyList (newValue) {
            setLocalStorage('historyList', newValue)
        }
    },
    created () {
        const favoriteList = getLocalStorage('favoriteList')
        if (favoriteList === null) { return }
        this.setFavoriteList(favoriteList)

        const historyList = getLocalStorage('historyList')
        if (historyList === null) { return }
        this.setHistoryList(historyList)
    },
    mounted () {
        this.$refs.audio.ondurationchange = () => {
            this.totalTime = this.$refs.audio.duration
        }
    },
    data () {
        return {
            totalTime: 0,
            currentTime: 0
        }
    }
}
</script>

<style scoped lang="scss">

</style>
