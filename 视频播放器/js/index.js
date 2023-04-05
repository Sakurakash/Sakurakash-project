window.onload = function () {
    let oVideo = document.querySelector("video");
    let oFigure = document.querySelector("figure");
    let oTotalTime = document.querySelector(".time>span:last-child");
    let oCurrentTime = document.querySelector(".current-time");
    let oPlay = document.querySelector("#play");
    let oLine = document.querySelector(".line");
    let oProgress = document.querySelector(".progress");
    let oFullBtn = document.querySelector("#full");
    oVideo.oncanplay = function () {
        oFigure.style.backgroundImage = "none";
        oVideo.style.display = "block";
        oTotalTime.innerText = formatDate(oVideo.duration);
    };
    let flag = false;
    oPlay.onclick = function () {
        if (flag){
            flag = false;
            oPlay.className = "iconfont icon-bofang";
            oVideo.pause();
        }else {
            flag = true;
            oPlay.className = "iconfont icon-zanting";
            oVideo.play();
        }
    };
    oVideo.ontimeupdate = function () {
        oCurrentTime.innerText = formatDate(oVideo.currentTime);
        oLine.style.width = (oVideo.currentTime*100/oVideo.duration) + "%";
    };
    oProgress.onclick = function (event) {
        oLine.style.width = event.offsetX + "px";
        oVideo.currentTime = event.offsetX / oProgress.offsetWidth * oVideo.duration;
    }
    oVideo.onended = function () {
        oPlay.className = "iconfont icon-bofang";
        oVideo.pause();
        oVideo.currentTime = 0;
        flag = false;
    }
    oFullBtn.onclick = function () {
        oVideo.requestFullscreen();
    }
};
function formatDate(time) {
    //计算小时
    let hour = Math.floor(time/60/60%24);
    hour = hour < 10 ? "0" + hour : hour;
    //计算分钟
    let minute = Math.floor(time/60%60);
    minute = minute < 10 ? "0" + minute : minute;
    //计算秒
    let second = Math.floor(time%60);
    second = second < 10 ? "0" + second : second;
    return `${hour}:${minute}:${second}`;
}
