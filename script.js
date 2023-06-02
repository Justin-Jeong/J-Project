var game=document.getElementById("game");
var ctx=game.getContext("2d");


var rows=15;
var cols=15;
var blockSize=25;

game.height=rows*blockSize;
game.width=cols*blockSize;


var snakeX=blockSize*4;
var snakeY=blockSize*4;


var moveX=0;
var moveY=0;


var foodX;
var foodY;


var snakeBody = [];


var gameState="play";


var gameOverMenu=document.getElementById("gameOverMenu");


var btn=document.getElementById("btn");


var myInterval;



window.onload = function(){
    placeFood();
    document.addEventListener("keydown",moveSnake);
    myInterval= setInterval(drawGame,200);
}

function drawGame(){
    ctx.fillStyle="#220";
    ctx.fillRect(0,0,game.width,game.height);
    
    if(gameState=="play")
    {
    ctx.fillStyle="orange";
    ctx.fillRect(foodX,foodY,blockSize,blockSize);

    if(foodX==snakeX && foodY==snakeY){
        snakeBody.push([foodX,foodY]);
        var eat =new Audio("eat.mp3");
        eat.play();
        placeFood();
    }

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }

    if(snakeBody.length!=0){
        snakeBody[0]=[snakeX,snakeY];
    }
    
    ctx.fillStyle="red";
    snakeX=snakeX+moveX*blockSize;
    snakeY=snakeY+moveY*blockSize;
    ctx.fillRect(snakeX,snakeY,blockSize,blockSize);

    for(let i=0;i<snakeBody.length;i++){
        ctx.fillStyle="orange";
        ctx.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
    }

   
    if(snakeX<0 || snakeX>cols*blockSize || snakeY<0 || snakeY>rows*blockSize){
        gameState="gameOver";
        gameOverMenu.style.visibility="visible";
        btn.addEventListener("click",restart);

        
        var wallhit=new Audio("wallhit.mp3");
        wallhit.play();
        clearInterval(myInterval);
        ctx.fillStyle="#222";
        ctx.fillRect(0,0,game.width,game.height);
    }

    for(let i=0;i<snakeBody.length;i++){
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
        gameState="gameOver";
        gameOverMenu.style.visibility="visible";
        btn.addEventListener("click",restart);
         
         var wallhit=new Audio("wallhit.mp3");
         wallhit.play();
         clearInterval(myInterval);
         ctx.fillStyle="#222";
         ctx.fillRect(0,0,game.width,game.height);
        }
    }
        
}

function placeFood(){
    foodX=Math.floor(Math.random()*cols)*blockSize;
    foodY=Math.floor(Math.random()*rows)*blockSize;
}

function moveSnake(e){
    if(e.code=="ArrowUp" && moveY!=1){
        moveX=0;
        moveY=-1;
    }
    else if(e.code=="ArrowDown" && moveY!=-1){
        moveX=0;
        moveY=1;
    }
    else if(e.code=="ArrowLeft" && moveX!=1){
        moveX=-1;
        moveY=0;
    }    else if(e.code=="ArrowRight" && moveX!=-1){
        moveX=1;
        moveY=0;
    }

    
    var move = new Audio("move.mp3");
    move.play();
}

function restart(){
    location.reload();
}