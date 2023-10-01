<template>
    <div class="recommend">
        <ScrollView ref="scrollView">
            <div>
                <banner :banners="banners"></banner>
                <Personalized :personalized="personalized" :title="`推荐歌单`" @select="fatherSelectItem" :type="`personalized`"></Personalized>
                <Personalized :personalized="albums" :title="`最新专辑`" @select="fatherSelectItem" :type="`album`"></Personalized>
                <SongList :songs="songs"></SongList>
            </div>
        </ScrollView>
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { getBanner, getNewAlbum, getNewSongs, getPersonalized } from '../api/index'
import Banner from '../components/Recommend/Banner.vue'
import Personalized from '../components/Recommend/Personalized.vue'
import SongList from '../components/Recommend/SongList.vue'
import ScrollView from '../components/ScrollView.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'recommend',
    components: {
        Banner,
        Personalized,
        SongList,
        ScrollView
    },
    methods: {
        fatherSelectItem (id, type) {
            this.$router.push({
                path: `recommend/detail/${id}/${type}`
            })
        }
    },
    computed: {
        ...mapGetters([
            'isShowMiniPlayer'
        ])
    },
    watch: {
        isShowMiniPlayer () {
            this.$refs.scrollView.refresh()
        }
    },
    data () {
        return {
            banners: [],
            personalized: [],
            albums: [],
            songs: []
        }
    },
    created () {
        getBanner().then((data) => {
            this.banners = data.banners
        }).catch(function (error) {
            console.log(error)
        })
        getPersonalized().then((data) => {
            this.personalized = data.result
        }).catch(function (error) {
            console.log(error)
        })
        getNewAlbum().then((data) => {
            this.albums = data.albums.splice(0, 6)
        }).catch(function (error) {
            console.log(error)
        })
        getNewSongs().then((data) => {
            const list = []
            data.result.forEach(({ id, name, song }) => {
                const obj = {}
                obj.id = id
                obj.name = name
                obj.picUrl = song.album.picUrl
                let singer = ''
                for (let i = 0; i < song.artists.length; i++) {
                    if (i === 0) {
                        singer = song.artists[i].name
                    } else {
                        singer += '-' + song.artists[i].name
                    }
                }
                obj.singer = singer
                list.push(obj)
            })
            this.songs = list
        }).catch(function (error) {
            console.log(error)
        })
    }
}
</script>

<style scoped lang="scss">
.recommend{
    position: fixed;
    top: 184px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    .v-enter{
        transform: translateX(100%);
    }
    .v-enter-to{
        transform: translateX(0);
    }
    .v-enter-active{
        transition: transform 0.5s;
    }
    .v-leave{
        transform: translateX(0);
    }
    .v-leave-to{
        transform: translateX(100%);
    }
    .v-leave-active{
        transition: transform 0.5s;
    }
}
</style>
