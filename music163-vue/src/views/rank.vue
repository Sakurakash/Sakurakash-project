<template>
    <div class="rank">
        <div class="rank-wrapper">
            <ScrollView ref="scrollView">
                <ul>
                    <li v-for="(value, key) in category.titles" :key="key">
                        <h3 class="group-title">{{value}}</h3>
                        <ul class="normal-group" v-if="value === '官方榜'">
                            <li v-for="{rank} in category[key]" :key="rank.id" @click.stop="selectedItem(rank.id)">
                                <div class="rank-left">
                                    <img v-lazy="rank.coverImgUrl" alt="">
                                    <p>{{ rank.updateFrequency }}</p>
                                </div>
                                <div class="rank-right">
                                    <p v-for="(song, index) in rank.tracks" :key="song.first">{{index + 1}}.{{song.first}}-{{song.second}}</p>
                                </div>
                            </li>
                        </ul>
                        <ul class="other-group" v-else>
                            <li v-for="{rank} in category[key]" :key="rank.id" @click.stop="selectedItem(rank.id)">
                                <div class="rank-top">
                                    <img v-lazy="rank.coverImgUrl" alt="">
                                    <p>{{ rank.updateFrequency }}</p>
                                </div>
                                <div class="rank-bottom">
                                    <p>{{ rank.name }}</p>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class="box"></li>
                </ul>
            </ScrollView>
        </div>
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { getTopListDetail } from '@/api'
import ScrollView from '@/components/ScrollView.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'rank',
    components: {
        ScrollView
    },
    methods: {
        selectedItem (id) {
            this.$router.push(`/rank/detail/${id}/personalized`)
        }
    },
    data () {
        return {
            category: {}
        }
    },
    created () {
        getTopListDetail().then(data => {
            this.category = data
        }).catch(err => {
            console.log(err)
        })
    },
    computed: {
        ...mapGetters([
            'isShowMiniPlayer'
        ])
    },
    watch: {
        isShowMiniPlayer (newValue) {
            const oList = document.querySelector('.box')
            if (newValue) {
                oList.classList.add('active')
            } else {
                oList.classList.remove('active')
            }
            this.$refs.scrollView.refresh()
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.rank{
    width: 100%;
    height: 100%;
    .rank-wrapper{
        position: fixed;
        left: 0;
        right: 0;
        top: 184px;
        bottom: 0;
        overflow: hidden;
        @include bg_sub_color();
        .group-title{
            padding: 10px 20px;
            box-sizing: border-box;
            @include font_color();
            @include font_size($font_large);
            font-weight: bold;
        }
        .normal-group{
            li{
                display: flex;
                align-items: center;
                padding: 10px 20px;
                box-sizing: border-box;
                .rank-left{
                    position: relative;
                    img{
                        width: 200px;
                        height: 200px;
                        border-radius: 10px;
                    }
                    p{
                        position: absolute;
                        left: 10px;
                        bottom: 10px;
                        color: #fff;
                        @include font_size($font_medium_s);
                    }
                }
                .rank-right{
                    margin-left: 20px;
                    p{
                        @include font_color();
                        @include font_size($font_medium_s);
                        padding: 10px 0;
                    }
                }
            }
        }
        .other-group{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li{
                padding: 10px 20px;
                box-sizing: border-box;
                .rank-top{
                    position: relative;
                    img{
                        width: 200px;
                        height: 200px;
                        border-radius: 10px;
                    }
                    p{
                        position: absolute;
                        left: 10px;
                        bottom: 10px;
                        color: #fff;
                        @include font_size($font_medium_s);
                    }
                }
                .rank-bottom{
                    width: 200px;
                    text-align: center;
                    @include no-wrap();
                    p{
                        padding: 10px 0;
                        @include font_color();
                        @include font_size($font_medium_s);
                    }
                }
            }
        }
        .box{
            height: 0;
            &.active{
                height: 150px;
            }
        }
    }
}
</style>
