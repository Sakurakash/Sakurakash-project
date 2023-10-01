<template>
    <div class="singer">
        <ScrollView ref="scrollView">
            <ul class="list-wrapper">
               <li class="list-group" v-for="(value, index) in list" :key="index" ref="group">
                   <h2 class="group-title">{{ keys[index] }}</h2>
                   <ul>
                       <li class="group-item" v-for="{id, img1v1Url, name} in list[index]" :key="id" @click.stop="switchSinger(id)">
                           <img v-lazy="img1v1Url" alt="">
                           <p>{{ name }}</p>
                       </li>
                   </ul>
               </li>
            </ul>
        </ScrollView>
        <ul class="list-keys">
            <li v-for="(key, index) in keys"
                :key="key"
                :data-index="index"
                @touchstart.stop.prevent="touchstart"
                @touchmove.stop.prevent="touchmove"
                :class="{'active': currentIndex === index}">{{key}}</li>
        </ul>
        <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { getAllArtists } from '@/api'
import ScrollView from '@/components/ScrollView.vue'

export default {
    name: 'singer',
    components: {
        ScrollView
    },
    data () {
        return {
            keys: [],
            list: [],
            groupsTop: [],
            currentIndex: 0,
            beginOffsetY: 0,
            moveOffsetY: 0,
            scrollY: 0
        }
    },
    computed: {
        fixTitle () {
            if (this.scrollY >= 0) {
                return ''
            } else {
                return this.keys[this.currentIndex]
            }
        }
    },
    methods: {
        _keyDown (index) {
            this.currentIndex = index
            const offsetY = this.groupsTop[index]
            this.$refs.scrollView.scrollTo(0, -offsetY)
        },
        touchstart (e) {
            const index = parseInt(e.target.dataset.index)
            this._keyDown(index)

            this.beginOffsetY = e.touches[0].pageY
        },
        touchmove (e) {
            this.moveOffsetY = e.touches[0].pageY
            const offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
            // console.log(offsetY)
            let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
            if (index < 0) {
                index = 0
            } else if (index > this.keys.length - 1) {
                index = this.keys.length - 1
            }
            this._keyDown(index)
        },
        switchSinger (id) {
            this.$router.push(`/singer/detail/${id}/singer`)
        }
    },
    created () {
        getAllArtists().then(data => {
            this.keys = data.keys
            this.list = data.list
        }).catch(err => {
            console.log(err)
        })
    },
    mounted () {
        this.$refs.scrollView.scrolling((y) => {
            this.scrollY = y
            // 处理第一个区域
            if (y >= 0) {
                this.currentIndex = 0
                return
            }
            // 处理中间区域
            for (let i = 0; i < this.groupsTop.length - 1; i++) {
                const preTop = this.groupsTop[i]
                const nextTop = this.groupsTop[i + 1]
                if (-y >= preTop && -y <= nextTop) {
                    this.currentIndex = i
                    // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
                    const diffOffsetY = nextTop + y
                    let fixTitleOffsetY = 0
                    // 2.判断计算的结果是否是 0 ~ 分组标题高度的值
                    if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
                        // 满足条件开始移动上一组标题
                        fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
                    } else {
                        // 不满足条件需要固定在顶部
                        fixTitleOffsetY = 0
                    }
                    if (fixTitleOffsetY === this.fixTitleOffsetY) {
                        return
                    }
                    this.fixTitleOffsetY = fixTitleOffsetY
                    this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
                    return
                }
            }
            // 处理最后一个区域
            this.currentIndex = this.groupsTop.length - 1
        })
    },
    watch: {
        list () {
            this.$nextTick(() => {
                this.$refs.group.forEach((group) => {
                    this.groupsTop.push(group.offsetTop)
                })
            })
        },
        fixTitle () {
            this.$nextTick(() => {
                this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.singer{
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    overflow: hidden;
    .list-wrapper{
        list-style: none;
        .group-title{
            @include bg_color();
            @include font_size($font_medium_s);
            color: #fff;
            padding: 10px 20px;
            box-sizing: border-box;
        }
        .group-item{
            display: flex;
            justify-content: flex-start;
            padding: 10px 20px;
            border-bottom: 1px solid #ccc;
            img{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
            }
            p{
                @include font_size($font_medium);
                @include font_color();
                display: flex;
                align-items: center;
                margin-left: 20px;
            }
        }
    }
    .list-keys{
        position: fixed;
        right: 10px;
        top: 60%;
        transform: translateY(-50%);
        li{
            @include font_color();
            @include font_size($font_medium_s);
            padding: 3px 0;
            &.active{
                text-shadow: 0 0 10px #000;
            }
        }
    }
    .fix-title{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        padding: 10px 20px;
        box-sizing: border-box;
        @include font_size($font_medium);
        color: #fff;
        @include bg_color();
    }
}
.v-enter{
    transform: translateX(100%);
}
.v-enter-to{
    transform: translateX(0%);
}
.v-enter-active{
    transition: transform 0.5s;
}
.v-leave{
    transform: translateX(0%);
}
.v-leave-to{
    transform: translateX(100%);
}
.v-leave-active{
    transition: transform 0.5s;
}
</style>
