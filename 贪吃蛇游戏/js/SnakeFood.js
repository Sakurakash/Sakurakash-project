class SnakeFood {
    constructor(width, height, img, snakeMap) {
        this.width = width;
        this.height = height;
        this.img = img;
        this.map = snakeMap;
        //计算能放下多少蛇的身体
        let style = getComputedStyle(this.map);
        this.rowNum = parseInt(style.width)/this.width;
        this.colNum = parseInt(style.height)/this.height;
    }
    reader(){//接收地图
        //1.创建食物
        let oDiv = document.createElement("div");
        this.food = oDiv;
        //2.添加食物样式
        oDiv.style.width = this.width + "px";
        oDiv.style.height = this.height + "px";
        oDiv.style.position = "absolute";
        oDiv.style.backgroundImage = `url(${this.img})`;
        //3.随机生成水平方向和垂直方向的值
        let {x, y} = this.generateLocation();
        this.x = x;
        this.y = y;
        oDiv.style.left = this.x*this.width +"px";
        oDiv.style.top = this.y*this.height +"px";
        //4.将食物添加到地图
        this.map.appendChild(oDiv);
    }
    remove(){
        this.food.parentNode.removeChild(this.food);
        this.reader();
    }
    generateLocation(){
        let x = Math.floor(Math.random() * this.rowNum);
        let y = Math.floor(Math.random() * this.colNum);
        return {x : x, y : y};
    }
}


