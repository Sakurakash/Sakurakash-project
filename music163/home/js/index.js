$(function () {
    // 公共头部处理
    $(".Header").load('./../common/header.html', function () {
        // 当加载的内容被添加之后
        let sc = document.createElement("script");
        sc.src = "./../common/js/header.js";
        document.body.appendChild(sc);
    });
    // 公共底部处理
    $(".Footer").load('./../common/footer.html', function () {
        // 当加载的内容被添加之后
        let sc = document.createElement("script");
        sc.src = "./../common/js/footer.js";
        document.body.appendChild(sc);
    });
    // 公共内容处理
    let length = Math.ceil($("#refreshLogo")[0].getTotalLength());
    $("#refreshLogo").css("stroke-dasharray", length);
    $("#refreshLogo").css("stroke-dashoffset", length);
    let myScroll = new IScroll('.main', {
        mouseWheel: false,
        scrollbars: false,
        /*
        需要使用iscroll-probe.js才能生效probeType：
        1  滚动不繁忙的时候触发
        2  滚动时每隔一定时间触发
        3  每滚动一像素触发一次
        * */
        probeType: 3
    });
    let logoHeight = $(".pull-down").height();
    let bottomHeight = $(".pull-up").height();
    let maxOffset = null;
    let isPullDown = false;
    let isRefresh = false;
    myScroll.on("scroll", function () {
        if (!maxOffset){
            maxOffset = myScroll.maxScrollY - bottomHeight;
        }
        $("#refreshLogo").css("stroke-dashoffset", length);
        if (this.y >= logoHeight){
            if ((this.y - logoHeight)*4 < length){
                $("#refreshLogo").css("stroke-dashoffset", length - (this.y - logoHeight)*4);
            }else {
                $("#refreshLogo").css("stroke-dashoffset", 0);
                this.minScrollY = 230;
                isPullDown = true;
            }
        }
    });
    myScroll.on("scrollEnd", function () {
        if (isPullDown && !isRefresh){
            isRefresh = true;
            refresh();
        }
    });
    function refresh() {
        setTimeout(function () {
            myScroll.refresh();
            isRefresh = false;
            myScroll.minScrollY = 0;
            myScroll.scrollTo(0, 0);
            isPullDown = false;
        }, 1000);
    }
    // 轮播图
    window.onload = function () {
        new Swiper('.swiper', {
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                bulletClass : 'my-bullet',// 需设置.my-bullet(分页器)样式
                bulletActiveClass: 'my-bullet-active'// 需设置.my-bullet-active(激活状态)样式
            },

            // 自动监视
            observer: true,
            observeParents: true,
            observeSlideChildren: true,

            autoplay: {
                delay: 1000,// 1秒切换一次
                disableOnInteraction: false
            },

            loop: true, // 循环模式选项
        });
    }
    // banner数据获取
    homeApis.getHomeBanner().then(function (data) {
        let html = template("bannerSlide", data);
        $(".swiper-wrapper").html(html);
        myScroll.refresh();
    }).catch(function (err) {
        console.log(err);
    });
    // 导航时间获取
    $(".nav i").html(new Date().getDate());
    // 推荐歌单数据获取
    homeApis.getHomeRecommend().then(function (data) {
        let html = template("recommendItems", data);
        $(".recommend-bottom").html(html);
        myScroll.refresh();
    }).catch(function (err) {
        console.log(err);
    });
    // 独家放送数据获取
    homeApis.getHomeExclusive().then(function (data) {
        let html = template("exclusiveItems", data);
        $(".exclusive-bottom").html(html);
        myScroll.refresh();
    }).catch(function (err) {
        console.log(err);
    });
    // 新碟新歌数据获取
    homeApis.getHomeAlbum().then(function (data) {
        let html = template("albumItems", data);
        $(".album-bottom").html(html);
        myScroll.refresh();
    }).catch(function (err) {
        console.log(err);
    });
    // 推荐MV数据获取
    homeApis.getHomeMV().then(function (data) {
        let html = template("mvItems", data);
        $(".mv-bottom").html(html);
        myScroll.refresh();
    }).catch(function (err) {
        console.log(err);
    });
    // 推荐电台数据获取
    homeApis.getHomeDj().then(function (data) {
        let html = template("djItems", data);
        $(".dj-bottom").html(html);
        myScroll.refresh();
    }).catch(function (err) {
        console.log(err);
    });
});
