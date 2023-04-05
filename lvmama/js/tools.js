(function () {
    let boxTime = null;
    function linearAnimation(ele, obj, fn) {
        clearInterval(boxTime);
        boxTime = setInterval(function () {
            let flag = true;
            for (let key in obj){
                let attr = key;
                let target = obj[key];
                let style = getComputedStyle(ele);
                let begin = parseInt(style[attr]);
                let step = begin - target > 0 ? -13 : 13;
                begin = begin + step;
                if (Math.abs(target - begin) > Math.abs(step)){
                    flag = false;
                } else {
                    begin = target;
                }
                ele.style[attr] = begin + "px";
            }
            if (flag){
                clearInterval(boxTime);
                if (fn){
                    fn();
                }
            }
        }, 30);
    }
    function easeAnimation(ele, obj, fn) {
        clearInterval(boxTime);
        boxTime = setInterval(function () {
            let flag = true;
            for (let key in obj){
                let attr = key;
                let target = obj[key];
                let style = getComputedStyle(ele);
                let begin = parseInt(style[attr]);
                let step = (target - begin) * 0.3;
                begin = begin + step;
                if (Math.abs(step) > 1){
                    flag = false;
                } else {
                    begin = target;
                }
                ele.style[attr] = begin + "px";
            }
            if (flag){
                clearInterval(boxTime);
                if (fn){
                    fn();
                }
            }
        }, 30);
    }
    function getScreen() {
        let width , height;
        if (window.innerWidth){
            width = window.innerWidth;
            height = window.innerHeight;
        }else if (document.compatMode === "BackCompat"){
            width = document.body.clientWidth;
            height = document.body.clientHeight;
        }else {
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        }
        return {width : width, height : height};
    }
    function getPageScroll() {
        let x , y;
        if (window.scrollX){
            x = window.scrollX;
            y = window.scrollY;
        }else if (document.compatMode === "BackCompat"){
            x = document.body.scrollLeft;
            y = document.body.scrollTop;
        }else {
            x = document.documentElement.scrollLeft;
            y = document.documentElement.scrollTop;
        }
        return {x : x, y : y};
    }
    function ease(target) {
        clearInterval(timerId);
        timerId = setInterval(function () {
            let begin = document.documentElement.scrollTop;
            let step = (target - begin) * 0.3;
            begin += step;
            if (Math.abs(step) <= 1){
                clearInterval(timerId);
                window.scrollTo(0, target);
                return;
            }
            window.scrollTo(0, begin);
        }, 50);
    }
    function debounce(fn, delay) {
        let timerId = null;
        return function (event) {
            let self = this;
            let args = arguments;
            timerId && clearTimeout(timerId);
            timerId = setTimeout(function () {
                fn.apply(self, args);
            }, delay || 1000);
        }
    }
    function throttle(fn, delay) {
        let timerId = null;
        let flag = true;
        return function (event) {
            if (!flag){
                return;
            }
            flag = false;
            let self = this;
            let args = arguments;
            timerId && clearTimeout(timerId);
            timerId = setTimeout(function () {
                flag = true;
                fn.apply(self, args);
            }, delay || 1000);
        }
    }
    window.linearAnimation = linearAnimation;
    window.easeAnimation = easeAnimation;
    window.getScreen = getScreen;
    window.getPageScroll = getPageScroll;
    window.ease = ease;
    window.debounce = debounce;
    window.throttle = throttle;
})();
