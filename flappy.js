var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class box {
  constructor(x,y) {
    this.length = 25;
    this.width = 25;
    this.x = x;
    this.y = y;
    this.dy = 0;
  }

  gravity() {
    this.dy = this.dy + 0.1;
  }

  collision(a) {
    if((a.x - 37) < (this.x + this.length/2) && (this.x + this.length/2) < (a.x + 37)
    && (a.y - (a.width-1)/2) < (this.y - this.width/2) && (this.y - this.width/2) < (a.y + (a.width-1)/2)){
      window.alert('game over');
      document.location.reload();
    }
    else if((a.x - 37) < (this.x + this.length/2) && (this.x + this.length/2) < (a.x + 37)
    && (a.y - (a.width-1)/2) < (this.y + this.width/2) && (this.y + this.width/2) < (a.y + (a.width-1)/2)){
      window.alert('game over');
      document.location.reload();
    }
    else if((a.x - 37) < (this.x - this.length/2) && (this.x - this.length/2) < (a.x + 37)
    && (a.y - (a.width-1)/2) < (this.y - this.width/2) && (this.y - this.width/2) < (a.y + (a.width-1)/2)){
      window.alert('game over');
      document.location.reload();
    }
    else if((a.x - 37) < (this.x - this.length/2) && (this.x - this.length/2) < (a.x + 37)
    && (a.y - (a.width-1)/2) < (this.y + this.width/2) && (this.y + this.width/2) < (a.y + (a.width-1)/2)){
      window.alert('game over');
      document.location.reload();
    }
  }
}

class enemy {
  constructor(x,y,l,w){
    this.x = x;
    this.y = y;
    this.length = l;
    this.width = w;
  }
}

function drawRect(a){
  ctx.beginPath();
  ctx.moveTo(a.x - (a.length/2) , a.y - (a.width/2));
  ctx.lineTo(a.x - (a.length/2) , a.y + (a.width/2));
  ctx.lineTo(a.x + (a.length/2) , a.y + (a.width/2));
  ctx.lineTo(a.x + (a.length/2) , a.y - (a.width/2));
  ctx.closePath();
  ctx.stroke();
}

var player = new box(300,100);

var enemyObj = [4];
var enemyObj1 = [4];
var length,width,x;
x = 600;
const VELOCITY = 2 ;

for(var i=0 ; i<4 ; i++){
  length = 75;
  width = 525*Math.random() + 50;
  enemyObj[i] = new enemy( x , canvas.height - width/2 , length , width);
  width1 = canvas.height - enemyObj[i].width - 150;
  enemyObj1[i] = new enemy( x , width1/2 , length , width1);
  x += 415;
}



 function draw() {
   ctx.clearRect(0,0,canvas.width,canvas.height);
   for( i=0; i<4;i++){
      drawRect(enemyObj[i]);
      drawRect(enemyObj1[i]);
    }
    drawRect(player);
 }

 function update() {
   draw();
   for( i=0; i<4;i++){
      player.collision(enemyObj[i]);
      player.collision(enemyObj1[i]);
    }
   for (var i = 0; i < 4; i++) {
     enemyObj[i].x -= VELOCITY;
     enemyObj1[i].x -= VELOCITY;
     if(enemyObj[i].x + 25 < 0 || enemyObj1[i].x + 25 < 0){
       enemyObj[i].width = 50 + 525*Math.random();
       enemyObj[i].y = canvas.height - enemyObj[i].width/2;
       enemyObj[i].x = canvas.width + (enemyObj[i].length)/2 + 100*Math.random();

       enemyObj1[i].width = canvas.height - enemyObj[i].width - 150;
       enemyObj1[i].y = enemyObj1[i].width/2;
       enemyObj1[i].x = enemyObj[i].x;
     }
   }
   player.gravity();
   if(player.y  > canvas.height){
     window.alert('game over');
     document.location.reload();
   }
   if(player.y - 12.5 < 0){
     player.dy = -player.dy;
   }
   player.y += player.dy;

 }

 setInterval(update,10);


function handleKeyDown(e){
  console.log(e);
  if(e.code == 'Space'){
    player.dy = -5;
  }

  if(e.code == 'ArrowUp'){
    player.dy = -2.5;
  }
}


window.addEventListener('keydown',handleKeyDown);
