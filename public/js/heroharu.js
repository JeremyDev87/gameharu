let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let upBtn = document.getElementById("upBtn");
let downBtn = document.getElementById("downBtn");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

let haruImg1 = new Image();
let haruImg2 = new Image();
let haruImg3 = new Image();
haruImg1.src = './images/haru1.png';
haruImg2.src = './images/haru2.png';
haruImg3.src = './images/haru3.png';

let haruMove ="stand";
window.onkeydown = (e) => {
    if(e.code==="ArrowDown"){
        haruMove="down"
    }else if(e.code==="ArrowUp"){
        haruMove="up"
    }
}
upBtn.addEventListener("click",()=>{
    haruMove="up"
})
downBtn.addEventListener("click",()=>{
    haruMove="down"
})
let upPressShow = {
    x : 30,
    y :150,
    width : 50,
    height : 50,
    kind : '↑',
    font:"20px Georgia",
    draw() {
        ctx.font = this.font;
        ctx.strokeText(this.kind, this.x, this.y, this.width, this.height);
    }
}
let downPressShow = {
    x : 30,
    y :300,
    width : 50,
    height : 50,
    kind : '↓',
    font:"20px Georgia",
    draw() {
        ctx.font = this.font;
        ctx.strokeText(this.kind, this.x, this.y, this.width, this.height);
    }
}

let haru = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    image : haruImg1,
    draw(){
        ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
    }
}

let wallPattern = {
    x : 10,
    y:250,
    width : 1200,
    height : 5,
    draw() {
        ctx.fillStyle='black';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

upPressShow.draw();
downPressShow.draw();
haru.draw();
wallPattern.draw();

class Enemy {
    constructor() {
        this.x = 900;
        this.y = 200;
        this.width = 50;
        this.height = 50;
        this.attack = "up";
        this.kind ="H";
        this.font = "15px Georgia";
    }
    draw() {
        ctx.font = this.font;
        ctx.strokeText(this.kind, this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
let enemies = new Array();
let getFrame = 0;
let roopStop = 0;
function MakeFrame() {
    if(roopStop === 0) {
        requestAnimationFrame(MakeFrame)
        timer++;
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    let enemyShow = Math.floor(Math.random()*100)+300;
    let attackpattern;
    if(timer<=2000){
        attackpattern = 240;
    }else if(timer>2000 && timer<=6000){
        attackpattern = 120;
    }else{
        attackpattern = 90;
    }


    if(timer%attackpattern == 0) {
        let enemy = new Enemy();
        if(enemyShow%2==0){
            enemy.attack = "down";
        }else{
            enemy.attack = "up";
        }

        if(enemyShow%3==0){
            enemy.kind = "A";
        }else if(enemyShow%3==1){
            enemy.kind = "R";
        }else if(enemyShow%3==2){
            enemy.kind = "U";
        }else{
            enemy.kind = "H";
        }
        enemies.push(enemy);

    }
    enemies.forEach((a)=>{
        a.x--;
        if(a.attack==="down"){
            a.y = 250;
        }
        if(haru.x===a.x&&a.y===250){
            if(haruMove!=="up"){
                roopStop++;
                alert("사망하셨습니다.");
                window.location.reload()
            }
        }else if(haru.x===a.x&&a.y===200){
            if(haruMove!=="down"){
                roopStop++;
                alert("사망하셨습니다.");
                window.location.reload()
            }
        }
        a.draw();
    })

    if(haruMove==="up"){
        haru.height = 50;
        haru.y=175;
        upPressShow.font="40px Georgia";
        if(timer%10<5){
            haru.image  = haruImg2;
        }else{
            haru.image  = haruImg1;
        }

    }else if(haruMove==="down"){
        haru.image  = haruImg3;
        haru.height = 25;
        haru.y=220;
        downPressShow.font="40px Georgia";
    }else{
        getFrame=timer;
        if(timer%20<10){
            haru.image  = haruImg2;
        }else{
            haru.image  = haruImg1;
        }
    }
    
    if(timer>=getFrame+80&&haruMove!=="stand"){
        haruMove="stand";
        haru.height = 50;
        haru.y=200;
        upPressShow.font="20px Georgia";
        downPressShow.font="20px Georgia";
    }

    haru.draw();
    wallPattern.draw();
    upPressShow.draw();
    downPressShow.draw();
}


MakeFrame();