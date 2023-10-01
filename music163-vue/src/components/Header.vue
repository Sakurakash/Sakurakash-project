<template>
    <div class="header" @click="changeTheme">
        <!--注意点: 不能直接插槽设置样式-->
        <div class="left">
            <slot name="left">左边</slot>
        </div>
        <slot name="center">中间</slot>
        <div class="right">
            <slot name="right">右边</slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data: function () {
        return {
            themeList: ['theme', 'theme1', 'theme2'],
            index: 1
        }
    },
    methods: {
        changeTheme () {
            document.documentElement.setAttribute('data-theme', this.themeList[this.index])
            this.index++
            if (this.index >= this.themeList.length) {
                this.index = 0
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "./../assets/css/mixin";
.header{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    @include bg_color();
    .left, .right{
        width: 84px;
        height: 84px;
        margin-top: 8px;
        *{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
