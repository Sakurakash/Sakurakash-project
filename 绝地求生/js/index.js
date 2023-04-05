window.onload = function () {
    let oToolbar = document.querySelector(".toolbar");
    let oNav = document.querySelector(".nav");
    let oMenu = document.querySelector("#myMenu");
    let oUp = document.querySelector(".menu-up");
    let oDown = document.querySelector(".menu-down");
    let oTips = document.querySelector(".tips");
    new fullpage('#fullpage', {
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', `fifthPage`, `sixthPage`],
        menu: '#myMenu',
        verticalCentered: false,
        sectionsColor: ["#0f0", "#00f", "#fff", "#000", "#ff0", "#f00", "#000"],
        //设置导航栏消失
        onLeave: function (origin, destination, direction) {
            if (destination.isFirst){
                oToolbar.style.display = "block";
                oNav.style.top = "42px";
                oMenu.style.display = "none";
            }else {
                oToolbar.style.display = "none";
                oNav.style.top = 0;
                oMenu.style.display = "block";
            }
            if (destination.isLast){
                oTips.style.display = "none";
            }else {
                oTips.style.display = "block";
            }
        }
    });
    //监听菜单点击事件
    oUp.onclick = function () {
        fullpage_api.moveSectionUp();
    }
    oDown.onclick = function () {
        fullpage_api.moveSectionDown();
    }
    initSection4Animation();
};
//初始化第四屏动画
function initSection4Animation() {
    // 拿到要操作的li
    let oLis = document.querySelectorAll(".section-four ul li");
    let oImgs = document.querySelectorAll(".section-four ul li img");
    let oH3 = document.querySelectorAll(".section-four ul li h3");
    //给所有li添加移入移出事件;
    for (let i = 0; i < oLis.length; i++){
        let item = oLis[i];
        item.onmouseenter = function () {
            for (let i = 0; i < oLis.length; i++){
                oLis[i].style.width = "20%";
            }
            item.style.width = "60%";
            oImgs[i].style.opacity = "1";
            oH3[i].style.opacity = "0";
            if (i === 0){
                oImgs[0].style.left = "0";
            }else if (i === 2){
                oImgs[2].style.right = "0";
            }
        }
        item.onmouseleave = function () {
            oLis[0].style.width = "33%";
            oLis[1].style.width = "34%";
            oLis[2].style.width = "33%";
            oImgs[i].style.opacity = "0.6";
            oH3[i].style.opacity = "1";
            if (i === 0){
                oImgs[0].style.left = "-180px";
            }else if (i === 2){
                oImgs[2].style.right = "-180px";
            }
        }
    }
}