var Game = function () {
 var canvas = document.getElementById("canvas");
 var context = canvas.getContext("2d");

 function clear(){
   context.clearRect(0,0, 640, 800);
 }

 function update(){}
 
 function draw(){
   clear();
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