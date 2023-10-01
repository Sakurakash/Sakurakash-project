<template>
    <div class="detail-top">
        <div class="img-container">
            <img v-lazy="path" alt="">
            <div class="mask" ref="mask"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailTop',
    props: {
        path: {
            type: String,
            default: '',
            required: true
        }
    },
    methods: {
        changeMask (opacity) {
            this.$refs.mask.style.opacity = opacity
        }
    }
}
</script>

<style scoped lang="scss">
.detail-top{
    width: 100%;
    height: 500px;
    position: relative;
    overflow: hidden;
    .img-container{
        img{
            position: relative;
            top: -100px;
            width: 100%;
        }
        .mask{
            position: absolute;
            left: 0;
            top: 0;
            background: #000;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
}
</style>
