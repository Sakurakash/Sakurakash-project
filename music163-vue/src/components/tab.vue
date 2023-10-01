<template>
<div class="tab">
    <router-link to="recommend" custom v-slot="{ navigate, isActive }">
        <div class="item" :class="{ 'active': isActive }" @click="navigate">
            <span>推荐</span>
        </div>
    </router-link>
    <router-link to="singer" custom v-slot="{ navigate, isActive }">
        <div class="item" :class="{ 'active': isActive }" @click="navigate">
            <span>歌手</span>
        </div>
    </router-link>
    <router-link to="rank" custom v-slot="{ navigate, isActive }">
        <div class="item" :class="{ 'active': isActive }" @click="navigate">
            <span>排行</span>
        </div>
    </router-link>
    <router-link to="search" custom v-slot="{ navigate, isActive }">
        <div class="item" :class="{ 'active': isActive }" @click="navigate">
            <span>搜索</span>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    name: 'tab'
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.tab{
    width: 100%;
    height: 84px;
    display: flex;
    justify-content: space-around;
    @include bg_sub_color;
    .item{
        span{
            line-height: 84px;
            @include font_size($font_medium);
            @include font_color();
        }
        &.active{
            span{
                @include font_active_color();
            }
            border-bottom: 5px solid #000;
            @include border_color();
        }
    }
}
</style>
