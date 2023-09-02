$(function () {
    // 公共头部处理
    $(".header-box>input").focus(function () {
        $(".header").addClass("active");
        $(".header-container").show();
        // 2.处理搜索历史
        $(".history-bottom>li").remove();
        let historyArray = getHistory();
        if (historyArray.length === 0) {
            $(".search-history").hide();
        } else {
            $(".search-history").show();
            historyArray.forEach(function (item) {
                let oLi = $("<li>" + item + "</li>");
                $(".history-bottom").append(oLi);
            });
            $(".history-bottom>li").click(function () {
                window.location.href = "./../searchDetail/index.html?keyword=" + $(this).text();
            });
        }
        searchScroll.refresh();
    });
    // 监听头部输入框失去焦点
        $(".header-box>input").blur(function () {
            if(this.value.length === 0){
                return;
            }
            setHistory(this.value);
            this.value = "";
        });
    // 监听搜索界面清空历史记录
        $(".history-top>img").click(function () {
            localStorage.removeItem("history");
            $(".search-history").hide();
        });
        $(".header-cancel").click(function () {
            $(".header").removeClass("active");
            $(".header-container").hide();
            $(".header-box>input")[0].oninput();
        });
        $(".header-switch>span").click(function () {
            $(".header-switch>i").animate({left: this.offsetLeft}, 100);
            $(this).addClass("active").siblings().removeClass("active");
        });
    // 搜索框广告处理
        $(".search-ad>span").click(function () {
            $(".search-ad").remove();
            searchScroll.refresh();
        });
    // 处理相关搜索界面
        $(".header-box>input")[0].oninput = throttle(function () {
            if(this.value.length === 0){
                $(".search-ad").show();
                $(".search-hot").show();
                $(".search-current").hide();
            }else {
                $(".search-ad").hide();
                $(".search-history").hide();
                $(".search-hot").hide();
                $(".search-current").show();
                homeApis.getHomeSearchSuggest(this.value)
                    .then(function (data) {
                        $(".current-bottom>li").remove();
                        data.result.allMatch.forEach(function (obj) {
                            let oLi = $(`
                            <li>
                                <img src="./../common/images/topbar-it666-search.png">
                                <p>${obj.keyword}</p>
                            </li>`);
                            $(".current-bottom").append(oLi);
                            $(".current-bottom>li").click(function () {
                                window.location.href = "./../searchDetail/index.html?keyword=" + $(this).text();
                            });
                        });
                        searchScroll.refresh();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            $(".current-top").html(`搜索<span>"${this.value}"</span>`);
            searchScroll.refresh();
        }, 500);
    $(".current-top").click(function () {
        let text = $(this).find("span").text();
        text = text.replace(/"/g, "");
        setHistory(text);
        window.location.href = "./../searchDetail/index.html?keyword=" + text;
    });
    // 获取搜索历史数据
    function getHistory(){
        let historyArray = localStorage.getItem("history");
        if(!historyArray){
            historyArray = [];
        }else{
            historyArray = JSON.parse(historyArray);
        }
        return historyArray;
    }
    // 热搜榜数据获取
    homeApis.getHomeHotDetail().then(function (data) {
        let html = template("hotDetail", data);
        $(".hot-bottom").html(html);
        searchScroll.refresh();
    }).catch(function (err) {
        console.log(err);
    });
    // 热搜榜滚动
    let searchScroll = new IScroll('.header-container', {
        mouseWheel: false,
        scrollbars: false,
    });
    function setHistory(value) {
        let historyArray = getHistory();
        if(!historyArray.includes(value)){
            historyArray.unshift(value);
            localStorage.setItem("history", JSON.stringify(historyArray));
        }
    }
});
