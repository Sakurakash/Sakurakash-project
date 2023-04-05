window.onload = function () {
    //0.图片预加载;
    let urls = [];
    for (let i = 1; i <= 40; i++){
        i = i < 10 ? "0" + i : i;
        urls.push(`images/img${i}.jpg`);
    }
    preLoadImages(urls, function (oImages) {
        //1.初始化图片;
        let oMain = document.querySelector(".main");
        let oItems = initImages(oMain, oImages);
        //2.初始化容器;
        let colsNum = resetWidth(oMain, oItems);//设置居中;
        //3.实现流式布局;
        waterfall(oItems, colsNum);
        //4.监听可视区域的变化;
        window.onresize = throttle(function () {
            let oItems = document.querySelectorAll(".box");
            let colsNum = resetWidth(oMain, oItems);
            waterfall(oItems, colsNum);
        }, 500);
        //5.监听图片加载事件;
        loadImages(oItems, oMain, oImages);
    });
    /*//1.初始化图片;
    let oMain = document.querySelector(".main");
    initImages(oMain);
    //设置定时器是因为图片无法加载完全导致offsetHeight失效(该问题找不到解答);
    setTimeout(function () {
        let oItems = document.querySelectorAll(".box");
        //2.初始化容器;
        let colsNum = resetWidth(oMain, oItems);//设置居中;
        //3.实现流式布局;
        waterfall(oItems, colsNum);
        //4.监听可视区域的变化;
        window.onresize = throttle(function () {
            let oItems = document.querySelectorAll(".box");
            let colsNum = resetWidth(oMain, oItems);
            waterfall(oItems, colsNum);
        }, 500);
        //5.监听图片加载事件;
        loadImages(oItems, oMain);
    }, 100);*/
};
function loadImages(oItems, oMain, oImages) {
    let screenHeight = getScreen().height;
    window.onscroll = debounce(function () {
        let item = oItems[oItems.length - 1];
        let target = item.offsetTop + item.offsetHeight/2;
        if (getPageScroll().y + screenHeight >= target){
            oItems = initImages(oMain, oImages);
            let colsNum = resetWidth(oMain, oItems);
            waterfall(oItems, colsNum);
        }
    }, 500);
}
function waterfall(oItems, colsNum) {
    //创建一个数组,储存第一行元素的高度;
    let rowHeight = [];
    for (let i = 0; i < oItems.length; i++){
        let item = oItems[i];
        //判断是否是第一行元素;
        if (i < colsNum){
            item.style.position = "";
            rowHeight.push(item.offsetHeight);
        }else {
            //找到第一行中最矮的元素;
            let rowMin = Math.min.apply(this, rowHeight);
            //找到最矮元素对应索引;
            let minIndex = rowHeight.indexOf(rowMin);
            //找到最矮元素的offsetLeft;
            let minItem = oItems[minIndex];
            let minLeft = minItem.offsetLeft;
            //将新元素定位到最矮元素下方;
            item.style.position = "absolute";
            item.style.top = rowMin + "px";
            item.style.left = minLeft + "px";
            //改变原数组中"最矮"元素的高度;
            rowHeight[minIndex] += item.offsetHeight;
        }
    }
}
//设置瀑布流居中;
function resetWidth(oMain, oItems){
    //获取浏览器宽高;
    let {width, height} = getScreen();
    //获取图片宽高;
    let imgWidth = oItems[0].offsetWidth;
    //计算一行能放下多少张图片;
    let colsNum = Math.floor(width / imgWidth);
    //设置宽度和居中;
    oMain.style.width = imgWidth * colsNum + "px";
    oMain.style.margin = "0 auto";
    return colsNum;
}
//自动创建盒子和图片;
function initImages(oMain, oImages) {
    for (let i = 0; i < oImages.length; i++){
        let oDiv = document.createElement("div");
        oDiv.className = "box";
        oMain.appendChild(oDiv);
        let oImg = oImages[i];
        // let oImg = document.createElement("img");
        // i = i < 10 ? "0" + i : i;
        // oImg.src = `images/img${i}.jpg`;
        oDiv.appendChild(oImg);
    }
    return document.querySelectorAll(".box");//返回创建好的所有图片盒子;
}
//图片预加载;
function preLoadImage(url, fn) {
    let oImg = document.createElement("img");
    oImg.src = url;
    oImg.onload = function () {
        fn(oImg);
    };
}
function preLoadImages(urls, fn) {
    let totalCount = urls.length;
    let count = 0;
    let oImages = [];
    for (let i = 0; i < urls.length; i++){
        let url = urls[i];
        preLoadImage(url, function (oImg) {
            oImages.push(oImg);
            count++;
            if (count === totalCount){
                fn(oImages);
            }
        });
    }
}
