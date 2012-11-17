var Game = function () {
 var canvas = document.getElementById("canvas");
 var context = canvas.getContext("2d");

 function clear(){
   context.clearRect(0,0, 640, 800);
 }

 var Block = function(x,y){
               this.x = x;
               this.y = y;
               this.decreaseHeight = function(){
                 this.y += 10;
               }
 }

 var Piece = function(blocks){
   this.blocks = blocks;

   this.draw = function(){
     blocks.forEach(drawBlock);
   }

   this.update = function(){
     blocks.forEach(decreaseHeight);
   }

   this.landed = function(){
     var didLand = false;
     playArea.blocks.forEach(function(areaBlock){
       blocks.forEach(function(pieceBlock){
        if (areaBlock.y - 10 == pieceBlock.y && areaBlock.x == pieceBlock.x){
          didLand = true; 
        }
       })});
     return didLand;
   }

   function decreaseHeight(block){
     block.decreaseHeight();
   }
 }

 var PlayArea = function(){
    this.blocks = [new Block(50, 310), new Block(200,310), new Block(210,310), new Block(210,300)];
   
    this.draw = function(){
      this.blocks.forEach(drawBlock);
    }

    this.land = function(piece){
      this.blocks = this.blocks.concat(piece.blocks);
    }

  }
 
 var playArea = new PlayArea();
 var piece = new Piece([new Block(50, 0)]);

 function drawBlock(block){
   context.fillStyle = "rgb(200,0,0)";
   context.fillRect (block.x + 1, block.y + 1, 8, 8);
 }

  function update(){
    if (piece.landed()){
      playArea.land(piece);
      piece = new Piece([new Block(50, 0)]);
    }
    piece.update();
  }

 function draw(){
   clear();
   playArea.draw();
   piece.draw();   
 }
 
 this.play = function(){
   setInterval(function(){
     update();
     draw();
  }, 50);
 }
}

function playGame(){
  var game = new Game();
  game.play();
}