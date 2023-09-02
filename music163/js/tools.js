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
    function formatNum(num) {
        let res;
        if(num / 100000000 > 1){
            let temp = num / 100000000 + "";
            if(temp.indexOf(".") === -1){
                res = num / 100000000 + "亿";
            }else{
                res = (num / 100000000).toFixed(1) + "亿";
            }
        }else if(num / 10000 > 1){
            let temp = num / 10000 + "";
            if(temp.indexOf(".") === -1){
                res = num / 10000 + "万";
            }else{
                res = (num / 10000).toFixed(1) + "万";
            }
        }else{
            res = num;
        }
        return res;
    }
    function formatTime(time) {
        // 2.得到两个时间之间的差值(秒)
        let differSecond = time / 1000;
        // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
        let day = Math.floor(differSecond / (60 * 60 * 24));
        day = day >= 10 ? day : "0" + day;
        // 4.利用相差的总秒数 / 小时 % 24;
        let hour = Math.floor(differSecond / (60 * 60) % 24);
        hour = hour >= 10 ? hour : "0" + hour;
        // 5.利用相差的总秒数 / 分钟 % 60;
        let minute = Math.floor(differSecond / 60 % 60);
        minute = minute >= 10 ? minute : "0" + minute;
        // 6.利用相差的总秒数 % 秒数
        let second = Math.floor(differSecond % 60);
        second = second >= 10 ? second : "0" + second;
        return {
            day: day,
            hour: hour,
            minute: minute,
            second: second,
        }
    }
    function dateFormat(fmt, date) {
        // 1.处理年
        // 1.1找到yyyy
        // +在正则表达式中表示匹配1个或多个连续的指定字符
        // let reg = /y+/;
        let yearStr = fmt.match(/y+/);
        if(yearStr){
            yearStr = yearStr[0];
            // 1.2获取到当前的年
            let yearNum = date.getFullYear() + ""; // 2019
            yearNum = yearNum.substring(4 - yearStr.length)
            // 1.3利用当前的年替换掉yyyy
            fmt = fmt.replace(yearStr, yearNum);
        }
        // 2.处理其他的时间
        let obj = {
            "M+" : date.getMonth() + 1,
            "d+" : date.getDate(),
            "h+" : date.getHours(),
            "m+" : date.getMinutes(),
            "s+" : date.getSeconds()
        };
        // 2.1遍历取出所有的时间
        for(let key in obj){
            // let reg = new RegExp("M+");
            let reg = new RegExp(`${key}`);
            // 取出格式化字符串中对应的格式字符 MM dd hh mm ss
            let fmtStr = fmt.match(reg);
            if(fmtStr){
                fmtStr = fmtStr[0];
                // 单独处理一位或者两位的时间
                if(fmtStr.length === 1){
                    // 一位
                    fmt = fmt.replace(fmtStr, obj[key]);
                }else{
                    // 两位
                    let numStr = "00" + obj[key];
                    //"00" + 4 = "004"
                    //"00" + 23 = "0023"
                    numStr = numStr.substring((obj[key] + "").length);
                    fmt = fmt.replace(fmtStr, numStr);
                }
            }
        }
        // 3.将格式化之后的字符串返回
        return fmt;
    }
    function getSongs(){
        let songArray = sessionStorage.getItem("history");
        if(!songArray){
            songArray = [];
        }else{
            songArray = JSON.parse(songArray);
        }
        return songArray;
    }
    function setSong(id, name, singer) {
        let songArray = getSongs();
        let flag = false;
        for(let i = 0; i < songArray.length; i++){
            let song = songArray[i];
            if(song.id === id){
                flag = true;
                break;
            }
        }
        if(!flag){
            songArray.unshift({id: id, name: name, singer: singer});
            sessionStorage.setItem("history", JSON.stringify(songArray));
        }
    }
    function clearSongs(){
        sessionStorage.removeItem("history");
    }
    function deleteSongByIndex(index){
        let songArray = getSongs();
        songArray.splice(index, 1);
        sessionStorage.setItem("history", JSON.stringify(songArray));
        return songArray.length;
    }
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
    }
    window.linearAnimation = linearAnimation;
    window.easeAnimation = easeAnimation;
    window.getScreen = getScreen;
    window.getPageScroll = getPageScroll;
    window.ease = ease;
    window.debounce = debounce;
    window.throttle = throttle;
    window.formatNum = formatNum;
    window.formatTime = formatTime;
    window.dateFormat = dateFormat;
    window.getSongs = getSongs;
    window.setSong = setSong;
    window.clearSongs = clearSongs;
    window.deleteSongByIndex = deleteSongByIndex;
    window.getRandomIntInclusive = getRandomIntInclusive;
})();
