window.onload = function () {
    // 导航栏按钮处理
    let oCloseBtn = document.querySelector(".navbar-toggler");
    oCloseBtn.onclick = function () {
        oCloseBtn.classList.toggle("on");
    }
    // 登录下拉菜单处理
    let oLoginBtn = document.querySelector(".login");
    oLoginBtn.onmouseenter = function () {
        oLoginBtn.classList.add("on");
    }
    oLoginBtn.onmouseleave = function () {
        oLoginBtn.classList.remove("on");
    }
    // 导航栏吸顶效果
    let oTop = document.querySelector(".header>.top");
    let oMiddle = document.querySelector(".header>.middle");
    let limit = oTop.offsetHeight + oMiddle.offsetHeight;
    window.onscroll = function (ev) {
        if (window.scrollY >= limit){
            oTop.classList.remove("d-md-block");
            oMiddle.style.display = "none";
        }else {
            oTop.classList.add("d-md-block");
            oMiddle.style.display = "block";
        }
    }
    // 轮播图
    let mySwiper = new Swiper(".swiper", {
        autoplay: {
            delay: 3000,//1秒切换一次
        },

        pagination: {
            el: '.swiper-pagination',
            bulletClass : 'my-bullet',
            bulletActiveClass: 'my-bullet-active'
        },
        on:{
            init: function(){
                swiperAnimateCache(this); //隐藏动画元素
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function(){
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                let oName = document.querySelector(".swiper-name>span");
                let oNum = document.querySelector(".swiper-num>span");
                let offsetY = this.activeIndex * -45 + "px";
                let ani = [{ top: offsetY }];
                let options = {duration: 1000, fill: "forwards"};
                oName.animate(ani, options);
                oNum.animate(ani, options);
            }
        }
    });
    mySwiper.autoplay.stop();
    // 视差效果

    // 1.创建一个控制器对象controller
    let controller1 = new ScrollMagic.Controller();
    // 2.创建一个场景对象scene
    let scene1 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section1",
        triggerHook: "onLeave",
        duration: "100%"
    });
    // 告诉ScrollMagic哪一个元素需要固定
    scene1.setPin(".section1", {pushFollowers: false});
    // 创建一个GSAP动画
    scene1.setTween(".section1", {
        opacity: 0.5
    });
    // 3.将场景对象添加到控制器对象
    controller1.addScene(scene1);

    // 第二屏文字移动效果
    // 1.创建一个控制器对象controller
    let controller2 = new ScrollMagic.Controller();
    // 2.创建一个场景对象scene
    let scene2 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section2",
        triggerHook: "onEnter",
        reverse:false
    });
    // 告诉ScrollMagic哪一个元素需要固定
    scene2.setVelocity([".section2>.section-top>div:nth-of-type(2)", ".section2>.section-top p"], {
        top: 0,
        opacity: 1
    }, {
        duration: 1000,
    });
    // 3.将场景对象添加到控制器对象
    controller2.addScene(scene2);

    // 第二屏手机分离效果
    // 1.创建一个控制器对象controller
    let controller3 = new ScrollMagic.Controller();
    let oSectionTop = document.querySelector(".section-top");
    // 2.创建一个场景对象scene
    let scene3 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section2",
        triggerHook: "onLeave",
        offset: oSectionTop.offsetHeight - 150,
        duration: "100%"
    });
    // 告诉ScrollMagic哪一个元素需要固定
    scene3.setPin(".section2");
    // 创建一个GSAP动画
    let tm = new TimelineMax();
    tm.to(".middle-left", {
        transform: "translate(-100%)",
        opacity: 0,
    }).to(".middle-right", {
        transform: "translate(100%)",
        opacity: 0
    }, "<").to(".middle-text", {
        opacity: 1,
        delay: 0.4
    }, "<").to(".middle-phone", {
        opacity: 1,
    })
    scene3.setTween(tm);
    // 3.将场景对象添加到控制器对象
    controller3.addScene(scene3);

    // 轮播图自动播放效果
    // 1.创建一个控制器对象controller
    let controller4 = new ScrollMagic.Controller();
    // 2.创建一个场景对象scene
    let scene4 = new ScrollMagic.Scene({
        triggerElement: ".section2>.section-bottom",
        triggerHook: "onCenter",
    });
    scene4.on("start", function (e) {
        if (e.scrollDirection === "FORWARD"){
            mySwiper.autoplay.start();
        }else {
            mySwiper.autoplay.stop();
        }
    })
    // 3.将场景对象添加到控制器对象
    controller4.addScene(scene4);
}