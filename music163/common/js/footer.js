// 公共底部处理
$(function () {
    let classArray = ["home", "video", "me", "friend", "account"];
    $(".footer>ul>li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        let url = $(this).find("img").attr("src");
        url = url.replace("normal", "selected");
        $(this).find("img").attr("src", url);
        $(this).siblings().find("img").forEach(function (oImg) {
            oImg.src = oImg.src.replace("selected", "normal");
        });
        let currentName = classArray[$(this).index()];
        $(".header")[0].className = "header " + currentName;
    });
    let hashStr = window.location.hash.substr(1);
    if(hashStr.length === 0){
        $(".home").click();
    }else{
        $("."+hashStr).click();
    }
});
