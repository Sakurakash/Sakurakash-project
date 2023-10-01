<template>
    <div class="detail">
        <sub-header :title="playlist.name"></sub-header>
        <DetailTop :path="playlist['coverImgUrl']" ref="top"></DetailTop>
        <div class="bottom">
            <ScrollView ref="scrollView">
                <DetailBottom :playlist="playlist['tracks']"></DetailBottom>
            </ScrollView>
        </div>
    </div>
</template>

<script>
import SubHeader from '../components/Detail/DetailHeader.vue'
import DetailTop from '../components/Detail/DetailTop.vue'
import DetailBottom from '../components/Detail/DetailBottom.vue'
import ScrollView from '../components/ScrollView.vue'
import { getPlayList, getAlbum, getArtistsSongs } from '../api/index'
import { mapGetters } from 'vuex'
export default {
    name: 'detail',
    components: {
        SubHeader,
        DetailTop,
        DetailBottom,
        ScrollView
    },
    computed: {
        ...mapGetters([
            'isShowMiniPlayer'
        ])
    },
    watch: {
        isShowMiniPlayer (newValue) {
            this.$refs.scrollView.refresh()
        }
    },
    data () {
        return {
            playlist: {}
        }
    },
    created () {
        if (this.$route.params.type === 'personalized') {
            getPlayList({
                id: this.$route.params.id
            }).then(data => {
                this.playlist = data.playlist
            }).catch(err => {
                console.log(err)
            })
        } else if (this.$route.params.type === 'album') {
            getAlbum({
                id: this.$route.params.id
            }).then(data => {
                this.playlist = {
                    name: data.album.name,
                    coverImgUrl: data.album.picUrl,
                    tracks: data.songs
                }
            }).catch(err => {
                console.log(err)
            })
        } else if (this.$route.params.type === 'singer') {
            getArtistsSongs({ id: this.$route.params.id }).then(({ artist, hotSongs }) => {
                this.playlist = {
                    name: artist.name,
                    coverImgUrl: artist.picUrl,
                    tracks: hotSongs
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted () {
        const el = this.$refs.top.$el
        if (el !== undefined) {
            const defaultHeight = el.offsetHeight
            this.$refs.scrollView.scrolling(offsetY => {
                if (offsetY < 0) {
                    const scale = Math.abs(offsetY) / defaultHeight
                    this.$refs.top.changeMask(scale)
                    /*
                    注意点: 高斯模糊效果是非常消耗性能的, 不推荐在移动端中使用
                            如果非要在移动端中使用, 那么建议只设置一次
                    * */
                    /* const scale = 30 * Math.abs(offsetY) / defaultHeight
                    el.style.filter = `blur(${scale}px)` */
                } else {
                    const scale = 1 + offsetY / defaultHeight
                    el.style.transform = `scale(${scale})`
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.detail{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    @include bg_sub_color();
    .bottom{
        position: fixed;
        top: 500px;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>
