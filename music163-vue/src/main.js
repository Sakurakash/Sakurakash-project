import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './../src/assets/css/base.scss'
import VueLazyLoad from 'vue-lazyload'
import Loading from './plugin/loading/index'
// import MetaInfo from 'vue-meta-info'

// Vue.use(MetaInfo)
// 注意点: 如果想通过use的方式来注册组件, 那么必须先将组件封装成插件
Vue.use(Loading, {
    title: '正在加载...'
})

Vue.use(VueLazyLoad, {
    // 通过loading来配置占位图片
    loading: require('./assets/images/loading.png')
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
