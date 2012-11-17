var Game = function () {
 var canvas = document.getElementById("canvas");
 var context = canvas.getContext("2d");

 function clear(){
   context.clearRect(0,0, 640, 800);
 }

 function update(){}
 
 var Block = function(x,y){
               this.x = x;
               this.y = y;
 }

 function drawBlock(block){
   context.fillStyle = "rgb(200,0,0)";
   context.fillRect (block.x + 1, block.y + 1, 8, 8);
 }

 function draw(){
   clear();
   drawBlock(new Block(0,0)); 
 }
 
 this.play = function(){
   setInterval(function(){
     update();
     draw();
  }, 500);
 }
}

function playGame(){
  var game = new Game();
  game.play();
}