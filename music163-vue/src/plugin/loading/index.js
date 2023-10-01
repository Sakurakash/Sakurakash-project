// import Vue from 'vue'
import Loading from './Loading'

export default {
    // 注意点: 如果要将一个组件封装成一个插件, 那么必须提供一个install方法
    //         那么必须在install方法中注册当前的这个组件
    install: function (Vue, Options) {
        // 1.根据我们的组件生成一个构造函数
        const LoadingConstructor = Vue.extend(Loading)
        // 2.根据构造函数创建实例对象
        const LoadingInstance = new LoadingConstructor()
        // 3.随便创建一个标签(元素)
        const oDiv = document.createElement('div')
        // 4.将创建好的标签添加到界面上
        document.body.appendChild(oDiv)
        // 5.将创建好的实例对象挂载到创建好的元素上
        LoadingInstance.$mount(oDiv)

        // 添加初始化值
        if (Options && Options.title !== null && Options.title !== undefined) {
            LoadingInstance.title = Options.title
        }
        // 添加全局方法
        Vue.showLoading = () => {
            LoadingInstance.isShow = true
        }
        Vue.hiddenLoading = () => {
            LoadingInstance.isShow = false
        }
        // 添加实例方法
        Vue.prototype.$showLoading = () => {
            LoadingInstance.isShow = true
        }
        Vue.prototype.$hiddenLoading = () => {
            LoadingInstance.isShow = false
        }
    }
}
