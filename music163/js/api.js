;(function () {
    axios.defaults.baseURL = 'https://netease-cloud-music-livid.vercel.app';
    axios.defaults.timeout = 5000;
    class myHttp {
        static get(url='', data={}){
            return new Promise((resolve, reject) => {
                axios.get(url, {
                    params: data
                }).then(function (response) {
                    resolve(response.data);
                })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        }
        static post(url='', data={}){
            return new Promise((resolve, reject) => {
                axios.post(url, {
                    params: data
                }).then(function (response) {
                    resolve(response.data);
                }).catch(function (error) {
                    reject(error);
                });
            });
        }
    }
    class homeApis {
        static getHomeBanner(){
            return myHttp.get('/banner', {type: 2});
        }
        static getHomeRecommend(){
            return myHttp.get('/personalized');
        }
        static getHomeExclusive(){
            return myHttp.get('/personalized/privatecontent');
        }
        static getHomeAlbum(){
            return myHttp.get('/top/album');
        }
        static getHomeMV(){
            return myHttp.get('/personalized/mv');
        }
        static getHomeDj(){
            return myHttp.get('/personalized/djprogram');
        }
        static getHomeHotDetail(){
            return myHttp.get("/search/hot/detail");
        }
        static getHomeSearchSuggest(keywords){
            return myHttp.get("/search/suggest?keywords="+keywords+"&type=mobile");
        }
    }
    class SearchApis{
        /*
        keywords: 需要搜索的内容
        offset: 从什么地方开始获取数据
        [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10]
        limit: 从指定的位置开始取多少条数据
        type:
        // 1: 单曲,
        // 10: 专辑,
        // 100: 歌手,
        // 1000: 歌单,
        // 1002: 用户,
        // 1004: MV,
        // 1006: 歌词,
        // 1009: 电台,
        // 1014: 视频,
        // 1018:综合
        * */
        static getSearch(keywords="", offset=0, limit=30, type=1){
            return myHttp.get("/search", {
                keywords: keywords,
                offset: offset,
                limit: limit,
                type: type
            });
        }
    }
    class MusicApis{
        static getSongDetail(ids){
            return myHttp.get("/song/detail", {
                ids: ids
            });
        }
        static getSongURL(id){
            return myHttp.get("/song/url", {
                id: id
            });
        }
        static getSongLyric(id){
            return myHttp.get("/lyric", {
                id: id
            });
        }
    }
    class DetailApis{
        static getDjRadio(id){
            return myHttp.get("/dj/detail", {
                rid: id
            });
        }
        /*
        asc: false返回的数据从新到旧
        asc: true返回的数据从旧到新
        * */
        static getProgram(id, asc=false){
            return myHttp.get("/dj/program", {
                rid: id,
                asc: asc
            });
        }
    }
    window.myHttp = myHttp;
    window.homeApis = homeApis;
    window.SearchApis = SearchApis;
    window.MusicApis = MusicApis;
    window.DetailApis = DetailApis;
})();
