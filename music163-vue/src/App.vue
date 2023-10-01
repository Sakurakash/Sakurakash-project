<template>
    <div id="app">
        <MainHeader></MainHeader>
        <tab></tab>
        <keep-alive include="singer,search">
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import tab from './components/tab.vue'
import player from './views/player.vue'

export default {
    name: 'app',
    components: {
        MainHeader,
        tab,
        player
    },
    methods: {

    }
}
</script>
<style scoped lang="scss">
@import './assets/css/variable';
</style>
