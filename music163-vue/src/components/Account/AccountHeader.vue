<template>
    <Header class="header">
        <div slot="left" class="header-left" @click.stop="back"></div>
        <ul slot="center" class="header-title">
            <li :class="{'active' : switchNum === 0}" @click.stop="switchItem(0)">我的喜欢</li>
            <li :class="{'active' : switchNum === 1}" @click.stop="switchItem(1)">播放历史</li>
        </ul>
        <div slot="right" class="header-right"></div>
    </Header>
</template>

<script>
import Header from '../Header'
export default {
    name: 'AccountHeader',
    components: {
        Header
    },
    data () {
        return {
            switchNum: 0
        }
    },
    methods: {
        back () {
            window.history.back()
        },
        switchItem (num) {
            this.switchNum = num
            this.$emit('switchItem', num)
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.header{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 99;
    @include bg_color();
    .header-left, .header-right{
        width: 84px;
        height: 84px;
        margin-top: 8px;
    }
    .header-left{
        @include bg_img('../../assets/images/back');
    }
    .header-right{
        @include bg_img('../../assets/images/more');
    }
    .header-title{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        border-radius: 10px;
        color: #fff;
        font-weight: bold;
        @include font_size($font_medium);
        height: 60px;
        margin-top: 20px;
        li{
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            &:nth-of-type(1){
                border-right: 1px solid #fff;
            }
            &.active{
                background: rgba(255, 255, 255, 0.3);
            }
        }
    }
}
</style>
