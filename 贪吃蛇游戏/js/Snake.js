class Snake{
    constructor(obj) {
        obj = obj || {};
        this.width = obj.width || 100;
        this.height = obj.height || 100;
        this.headImg = obj.headImg || "images/head.png";
        this.bodyImg = obj.bodyImg || "images/body.png";
        this.map = obj.map || {};
        this.bodies = [
            {x: 2, y: 1, type: 1},
            {x: 1, y: 1, type: 0},
            {x: 0, y: 1, type: 0}
        ];
        let style = getComputedStyle(this.map);
        this.rowNum = parseInt(style.width)/this.width;
        this.colNum = parseInt(style.height)/this.height;
        document.body.onkeydown = (event) => {
            this.key = event.key;
        };
    }
    move(){
        //1.修改蛇身的位置
        for (let i = this.bodies.length - 1; i > 0; i--){
            this.bodies[i].x = this.bodies[i - 1].x;
            this.bodies[i].y = this.bodies[i - 1].y;
        }
        //2.修改蛇头的位置
        let head = this.bodies[0];
        switch (this.key){
            case "w":
                head.y -= 1;
                break;
            case "a":
                head.x -= 1;
                break;
            case "s":
                head.y += 1;
                break;
            case "d":
                head.x += 1;
                break;
            default:
                head.x += 1;
                break;
        }
    }
    inspection(snakeFood){
        let head = this.bodies[0];
        if (head.x < 0 || head.x >= this.rowNum || head.y < 0 || head.y >= this.colNum){
            alert("你挂了");
            clearInterval(this.timer);
            return false;
        }
        if (head.x === snakeFood.x && head.y === snakeFood.y){
            let lastBody = this.bodies[this.bodies.length - 1];
            let newBody = {x : lastBody.x, y : lastBody.y, type : 0};
            switch (this.key){
                case "w":
                    newBody.y += 1;
                    break;
                case "a":
                    newBody.x += 1;
                    break;
                case "s":
                    newBody.y -= 1;
                    break;
                case "d":
                    newBody.x -= 1;
                    break;
                default:
                    newBody.x -= 1;
                    break;
            }
            snakeFood.remove();
            this.bodies.push(newBody);
        }
        return true;
    }
    update(snakeFood){
        this.timer = setInterval(() => {
            this.move();
            let flag = this.inspection(snakeFood);
            if(!flag){
                return;
            }
            this.reader();
        }, 500);
    }
    reader(){
        //删除过去创建的蛇，创建一条新蛇
        let snake = document.querySelectorAll(".snake");
        for (let i = snake.length - 1; i >= 0 ; i--){
            let oDiv = snake[i];
            oDiv.parentNode.removeChild(oDiv);
        }
        //1.创建蛇的每一个组成部分
        for(let value of this.bodies){
            let oDiv = document.createElement("div");
            oDiv.className = "snake";
            //2.设置每一个组成部分的样式
            oDiv.style.width = this.width + "px";
            oDiv.style.height = this.height + "px";
            if(value.type === 1){
                oDiv.style.background = `url(${this.headImg})`;
            }else{
                oDiv.style.background = `url(${this.bodyImg})`;
            }
            //3.设置每一个组成部分的位置
            oDiv.style.position = "absolute";
            oDiv.style.left = value.x * this.width + "px";
            oDiv.style.top = value.y * this.height + "px";
            //4.将每一个组成部分添加到地图中
            this.map.appendChild(oDiv);
        }
    }
}