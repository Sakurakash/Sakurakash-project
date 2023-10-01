<template>
    <div class="song">
        <div class="song-top">
            <h3>最新音乐</h3>
        </div>
        <SongListItem :songs="songs"></SongListItem>
    </div>
</template>

<script>
import SongListItem from '@/components/SongListItem.vue'

export default {
    name: 'SongList',
    props: {
        songs: {
            type: Array,
            default: () => [],
            required: true
        }
    },
    components: {
        SongListItem
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.song{
    width: 100%;
    @include bg_sub_color();
    .song-top {
        width: 100%;
        height: 84px;
        line-height: 84px;
        @include bg_sub_color();
        border-bottom: 1px solid #ccc;
        padding: 0 20px;
        h3 {
            font-weight: bold;
            @include font_size($font_large);
            @include font_color();
        }
    }
}
</style>
<script setup>
</script>
