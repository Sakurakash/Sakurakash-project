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
});
