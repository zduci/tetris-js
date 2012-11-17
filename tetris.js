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

 var PlayArea = function(){
   function blocks(){
     return [new Block(200,310), new Block(210,310), new Block(210,300)];
   }

   this.draw = function(){
     blocks().forEach(drawBlock);
   }
 }
 
 var playArea = new PlayArea();

 function drawBlock(block){
   context.fillStyle = "rgb(200,0,0)";
   context.fillRect (block.x + 1, block.y + 1, 8, 8);
 }

 function draw(){
   clear();
   playArea.draw();   
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