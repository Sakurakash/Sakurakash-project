$(function () {
    // 0.定义类管理每一个界面
    class Views{
        constructor(params){
            params = params || {offset: 0, limit: 30};
            this.offset = params.offset;
            this.limit = params.limit;
        }
    }
    class Composite extends Views{
        constructor(params){
            super(params);
            this.name = "composite";
            this.type = 1018;
        }
        initData(keyword){
            // 加载综合界面默认数据
            SearchApis.getSearch(keyword,this.offset, this.limit, this.type)
                .then(function (data) {
                    // 1.创建所有的分区
                    let html = template('compositeItem', data.result);
                    $(".main-in>.composite").html(html);

                    // 2.填充分区的数据
                    data.result.order.forEach(function (name) {
                        let currentData = data.result[name];
                        if(name === "song"){
                            currentData.songs.forEach(function (obj) {
                                obj.artists = obj.ar;
                                obj.album = obj.al;
                            });
                        }else if(name === "playList"){
                            currentData.playlists = currentData.playLists;
                            currentData.playlists.forEach(function (obj) {
                                obj.playCount = formatNum(obj.playCount);
                            });
                        }else if(name === "user"){
                            currentData.userprofiles = currentData.users;
                        }else if(name === "new_mlog"){
                            return;
                        }
                        try {
                            let currentHtml = template(name+'Item', currentData);
                            $(".composite>."+name+">.list").html(currentHtml);
                        }catch (e){
                            console.log(e);
                        }
                    });

                    // 3.监听分区的底部点击
                    $(".composite-bottom").click(function () {
                        // console.log(this.dataset.name);
                        $(".nav>ul>." + this.dataset.name).click();
                    });
                    myScroll.refresh();
                }).catch(function (err) {
                console.log(err);
            });
        }
    }
    class Song extends Views{
        constructor(myScroll, params) {
            super(params);
            this.myScroll = myScroll;
            this.name = "song";
            this.type = 1;
            // 监听多选按钮点击
            $(".multiple-select").click(function () {
                $(".main-in>.song>.top").addClass("active");
                $(".main-in>.song>.list").addClass("active");
            });
            // 监听完成按钮点击
            $(".complete-select").click(function () {
                $(".main-in>.song>.top").removeClass("active");
                $(".main-in>.song>.list").removeClass("active");
            });
            // 监听全选按钮点击
            $(".check-all").click(function () {
                $(this).toggleClass("active");
                $(".main-in>.song>.list>li").toggleClass("active");
            });
            // 处理单曲界面的头部
            this.myScroll.on("scroll", function () {
                // 处理单曲头部
                if (this.y < 0) {
                    $(".main-in>.song>.top").css({top: -this.y});
                } else {
                    $(".main-in>.song>.top").css({top: 0});
                }
            });
        }
        initData(keyword){
            let that = this;
            // 加载单曲界面默认数据
            SearchApis.getSearch(keyword, this.offset, this.limit, this.type)
                .then(function (data) {
                    if(isEmptyObj(data.result)){return}
                    // 根据服务器返回数据生成模板
                    let html = template('songItem', data.result);
                    $(".main-in>.song>.list").html(html);
                    that.myScroll.refresh();

                    // 监听每一首歌曲点击事件
                    $(".song>.list>li").click(function () {
                        let songId = this.dataset.musicId;
                        let songName = $(this).find(".song-name").text();
                        let songSinger = $(this).find(".song-singer").text();
                        setSong(songId, songName, songSinger);
                        window.location.href = "./../player/index.html"
                    });

                    // 监听每一首歌曲单选框的点击事件
                    $(".main-in>.song>.list>li i").click(function (event) {
                        $(this).parents("li").toggleClass("active");
                        if ($(".main-in>.song>.list>li").length === $(".main-in>.song>.list>li.active").length) {
                            if ($(".check-all").hasClass("active")) {
                            } else {
                                $(".check-all").addClass("active");
                            }
                        } else {
                            if ($(".check-all").hasClass("active")) {
                                $(".check-all").removeClass("active");
                            }
                        }
                        event.stopPropagation();
                    });

                    // 监听播放全部按钮的点击事件
                    $(".main-in>.song>.top .play-all").click(function () {
                        let lis = null;
                        if($(".main-in>.song>.list>li.active").length === 0){
                            lis = $(".main-in>.song>.list>li");
                        }else{
                            lis = $(".main-in>.song>.list>li.active");
                        }
                        lis.forEach(function (li) {
                            let songId = li.dataset.musicId;
                            let songName = $(li).find(".song-name").text();
                            let songSinger = $(li).find(".song-singer").text();
                            setSong(songId, songName, songSinger);
                        });
                        window.location.href = "./../player/index.html";
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
    class Video extends Views{
        constructor(params){
            super(params);
            this.name = "video";
            this.type = 1014;
        }
        initData(keyword) {
            // 加载视频界面默认数据
            SearchApis.getSearch(keyword, this.offset, this.limit, this.type)
                .then(function (data) {
                    if(isEmptyObj(data.result)){return}
                    data.result.videos.forEach(function (obj) {
                        obj.playCount = formatNum(obj.playTime);
                        let res = formatTime(obj.durationms);
                        obj.time = res.minute + ":" + res.second;
                    })
                    let html = template('videoItem', data.result);
                    $(".main-in>.video>.list").html(html);
                    myScroll.refresh();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
    class Artist extends Views{
        constructor(params){
            super(params);
            this.name = "artist";
            this.type = 100;
        }
        initData(keyword) {
            // 加载歌手界面默认数据
            SearchApis.getSearch(keyword, this.offset, this.limit, this.type)
                .then(function (data) {
                    if(isEmptyObj(data.result)){return}
                    let html = template('artistItem', data.result);
                    $(".main-in>.artist>.list").html(html);
                    myScroll.refresh();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
    class Album extends Views{
        constructor(params){
            super(params);
            this.name = "album";
            this.type = 10;
        }
        initData(keyword) {
            // 加载专辑界面默认数据
            SearchApis.getSearch(keyword, this.offset, this.limit, this.type)
                .then(function (data) {
                    if(isEmptyObj(data.result)){return}
                    data.result.albums.forEach(function (obj) {
                        obj.formatTime = dateFormat("yyyy-MM-dd", new Date(obj.publishTime));
                    });
                    let html = template('albumItem', data.result);
                    $(".main-in>.album>.list").html(html);
                    myScroll.refresh();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
    class PlayList extends Views{
        constructor(params){
            super(params);
            this.name = "playList";
            this.type = 1000;
        }
        initData(keyword) {
            // 加载歌单界面默认数据
            SearchApis.getSearch(keyword, this.offset, this.limit, this.type)
                .then(function (data) {
                    if(isEmptyObj(data.result)){return}
                    data.result.playlists.forEach(function (obj) {
                        obj.playCount = formatNum(obj.playCount);
                    });
                    let html = template('playListItem', data.result);
                    $(".main-in>.playList>.list").html(html);
                    myScroll.refresh();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
    class DjRadio extends Views{
        constructor(params){
            super(params);
            this.name = "djRadio";
            this.type = 1009;
        }
        initData(keyword) {
            // 加载主播电台界面默认数据
            SearchApis.getSearch(keyword, this.offset, this.limit, this.type)
                .then(function (data) {
                    if(isEmptyObj(data.result)){return}
                    let html = template('djRadioItem', data.result);
                    $(".main-in>.djRadio>.list").html(html);
                    myScroll.refresh();

                    // 监听每一个电台点击事件
                    $(".main-in>.djRadio>.list>li").click(function () {
                        let djId = this.dataset.djId;
                        window.location.href = "./../djDetail/index.html?id=" + djId;
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
    class User extends Views{
        constructor(params){
            super(params);
            this.name = "user";
            this.type = 1002;
        }
        initData(keyword) {
            // 加载用户界面默认数据
            SearchApis.getSearch(keyword, this.offset, this.limit, this.type)
                .then(function (data) {
                    if(isEmptyObj(data.result)){return}
                    let html = template('userItem', data.result);
                    $(".main-in>.user>.list").html(html);
                    myScroll.refresh();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
    function isEmptyObj(obj){
        return  Object.keys(obj).length === 0;
    }
    // 1.初始化头部
    let keyword = initHeader();
    function initHeader() {
        let keyword = window.location.href.substring(window.location.href.lastIndexOf("keyword=") + "keyword=".length);
        keyword = decodeURIComponent(keyword).trim();
        // 给头部输入框设置数据
        $(".header input").attr("value", keyword);
        // 监听返回按钮的点击
        $(".go-back").click(function () {
            window.history.back();
        });
        $(".clear-text").click(function () {
            window.history.back();
        });
        return keyword;
    }
    // 2.初始化上拉加载更多
    let isRefresh = true;
    let isPullUp = false;
    let index = 0;
    let myScroll = initScroll();
    function initScroll() {
        // 初始化上拉加载更多
        let myScroll = new IScroll(".main", {
            mouseWheel: false,
            scrollbars: false,
            probeType: 3,
        });
        myScroll.on("scroll", function () {
            // 处理上拉加载更多
            if(this.y <= myScroll.maxScrollY){
                $(".pull-up>p>span").html("松手加载更多");
                isPullUp = true;
            }
        });
        myScroll.on("scrollEnd", function () {
            if(isPullUp && !isRefresh){
                $(".pull-up>p>span").html("加载中...")
                isRefresh = true;
                // 去网络上刷新数据
                refreshUp();
            }
        });
        function refreshUp() {
            let curViewObj = views[index];
            curViewObj.offset += curViewObj.limit;
            SearchApis.getSearch(keyword, curViewObj.offset).then(function (data) {
                let name =  undefined;
                if(curViewObj.name === "user"){
                    name = "userprofileCount";
                }else{
                    name = curViewObj.name.toLowerCase() + "Count"
                }
                let count = data.result[name];
                if(count !== undefined && count > 0){
                    let html = template(curViewObj.name + 'Item', data.result);
                    $(".main-in>."+curViewObj.name+">.list").append(html);
                    isRefresh = false;
                    myScroll.refresh();
                }else{
                    $(".pull-up").hide();
                    isRefresh = true;
                }
                isPullUp = false;
            }).catch(function (err) {
                console.log(err);
            });
        }
        return myScroll;
    }
    // 3.初始化导航
    let views = [new Composite(), new Song(myScroll), new Video(), new Artist(), new Album(), new PlayList(), new DjRadio(), new User()];
    initNav();
    function initNav() {
        let oUlWidth = 0;
        $(".nav>ul>li").forEach(function (oLi) {
            oUlWidth += oLi.offsetWidth;
        });
        let navPaddingRight = parseFloat(getComputedStyle($(".nav")[0]).paddingRight);
        $(".nav>ul").css({width: oUlWidth + navPaddingRight});
        // 创建导航条滚动效果
        let navScroll = new IScroll(".nav", {
            mouseWheel: false,
            scrollbars: false,
            scrollX: true
        });
        $(".nav>ul>span").css({width: $(".nav>ul>li")[0].offsetWidth});
        // 监听导航条点击
        $(".nav>ul>li").click(function () {
            // 计算偏移位
            let offsetX = $(".nav").width()/2 - this.offsetLeft - this.offsetWidth/2;
            if(offsetX > 0){
                offsetX = 0;
            }else if(offsetX < navScroll.maxScrollX){
                offsetX = navScroll.maxScrollX;
            }
            // 让导航条滚动
            navScroll.scrollTo(offsetX, 0, 1000);
            // 设置选中状态
            $(this).addClass("active").siblings().removeClass("active");
            $(".main-in>div").removeClass("active").eq($(this).index()).addClass("active");
            $(".nav>ul>span").animate({left: this.offsetLeft, width: this.offsetWidth}, 200);
            // 重新计算滚动范围
            myScroll.refresh();

            // 控制上拉加载更多显示和隐藏
            index = $(this).index();
            // console.log(index);
            if(index === 0){
                $(".pull-up").hide();
                isRefresh = true;
            }else{
                $(".pull-up").show();
                isRefresh = false;
            }
            let curViewObj = views[index];
            if(curViewObj.initData){
                curViewObj.initData(keyword);
                delete curViewObj.initData;
            }
        });
    }

    // 4.初始化公共底部
    $(".Footer").load('./../common/footer.html', function () {
        // 当加载的内容被添加之后
        let sc = document.createElement("script");
        sc.src = "./../common/js/footer.js";
        document.body.appendChild(sc);
    });

    // 5.初始化默认界面
    let cp = new Composite();
    cp.initData(keyword);
});
