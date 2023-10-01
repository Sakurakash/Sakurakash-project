<template>
    <ul class="detail-bottom">
        <li class="bottom-top" @click="selectAllMusic">
            <div class="top-icon"></div>
            <div class="top-title">播放全部</div>
        </li>
        <li v-for="{al, ar, id, name} in playlist" :key="id" class="item" @click="selectMusic(id)">
            <h3>{{ name }}</h3>
            <p>{{ al.name }} - {{ ar[0].name }}</p>
        </li>
        <li class="box"></li>
    </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'DetailBottom',
    props: {
        playlist: {
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
        },
        selectAllMusic () {
            this.setFullScreen(true)
            const ids = this.playlist.map(function (item) {
                return item.id
            })
            this.setSongsDetail(ids)
        }
    },
    computed: {
        ...mapGetters([
            'isShowMiniPlayer'
        ])
    },
    watch: {
        isShowMiniPlayer (newValue) {
            const oList = document.querySelector('.detail-bottom>.box')
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
@import "../../assets/css/mixin";
.detail-bottom{
    width: 100%;
    li{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 2px solid #ccc;
        @include bg_sub_color();
    }
    .bottom-top{
        display: flex;
        align-items: center;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        .top-icon{
            width: 60px;
            height: 60px;
            @include bg_img('../../assets/images/small_play');
            margin-right: 20px;
        }
        .top-title{
            @include font_color();
            @include font_size($font_small);
        }
    }
    .item{
        h3{
            @include font_color();
            @include font_size($font_medium);
            @include clamp(1);
        }
        p{
            @include font_color();
            @include font_size($font_small);
            @include clamp(1);
            margin-top: 10px;
            opacity: 0.8;
        }
    }
    .box{
        padding: 0;
        border: none;
        &.active{
            height: 150px;
        }
    }
}
</style>
