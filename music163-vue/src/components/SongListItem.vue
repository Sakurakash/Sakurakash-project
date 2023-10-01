<template>
    <ul class="song-list">
        <li v-for="{id, name, picUrl, singer} in songs" :key="id" class="item" @click="selectMusic(id)">
            <img v-lazy="picUrl" alt="">
            <div>
                <h3>{{ name }}</h3>
                <p>{{ singer }}</p>
            </div>
        </li>
        <li class="box"></li>
    </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'SongListItem',
    props: {
        songs: {
            type: Array,
            default: () => [],
            required: true
        }
    },
    methods: {
        ...mapActions([
            'setFullScreen',
            'setMiniPlayer',
            'setSongsDetail'
        ]),
        selectMusic (id) {
            this.setFullScreen(true)
            this.setMiniPlayer(false)
            this.setSongsDetail([id])
        }
    },
    computed: {
        ...mapGetters([
            'isShowMiniPlayer'
        ])
    },
    watch: {
        isShowMiniPlayer (newValue) {
            const oList = document.querySelector('.song-list>.box')
            if (newValue) {
                oList.classList.add('active')
            } else {
                oList.classList.remove('active')
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.song-list{
    width: 100%;
    .item{
        width: 100%;
        height: 180px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        margin-bottom: 10px;
        border-bottom: 2px solid #ccc;
        box-sizing: border-box;
        img{
            width: 150px;
            height: 150px;
            border-radius: 20px;
            margin-right: 20px;
        }
        div{
            h3{
                @include font_size($font_large);
                @include font_color();
            }
            p{
                @include font_size($font_small);
                @include font_color();
                opacity: 0.6;
                margin-top: 20px;
            }
        }
    }
    .box{
        &.active{
            height: 150px;
        }
    }
}
</style>
