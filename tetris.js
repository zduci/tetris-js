var Game = function () {
 var canvas = document.getElementById("canvas");
 var context = canvas.getContext("2d");
 var lost = false;

 function clear(){
   context.clearRect(0,0, 640, 800);
 }

 var Block = function(x,y, color){
               this.x = x;
               this.y = y;
               this.color = color;
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
     blocks.forEach(function(block){
       if (block.y == playArea.height){
         didLand = true;
       }
     });
     if (didLand == false){
       playArea.blocks.forEach(function(areaBlock){
       blocks.forEach(function(pieceBlock){
        if (areaBlock.y - 10 == pieceBlock.y && areaBlock.x == pieceBlock.x){
          didLand = true;
        } 
       })});
     }
     return didLand;
   }

   this.reachedTop = function(){
      var reached = false;
      piece.blocks.forEach(function(block){
        if (block.y == 10){
          reached = true;
        }
      });
      return reached;
   }

   function decreaseHeight(block){
     block.decreaseHeight();
   }
 }

 function randomPiece(){
    var randomPiece = Math.floor(Math.random()*pieceTypes.length);
    var randomX = Math.floor(Math.random()*playArea.width/10)*10;
    var blocks = [];
    var color = randomColor();
    pieceTypes[randomPiece].blocks.forEach(function(block){
      blocks.push(new Block(randomX + block.x, block.y, color));
    });
    return new Piece(blocks);
 }

 var PlayArea = function(width, height){
    this.width = width;
    this.height = height;
    this.blocks = [];
   
    this.draw = function(){
      this.blocks.forEach(drawBlock);
    }

    this.land = function(piece){
      this.blocks = this.blocks.concat(piece.blocks);
    }
  }
 
 var pieceTypes = [new Piece([new Block(50, 0), new Block(60, 0), new Block(60, 10), new Block(50, 10)]),
                   new Piece([new Block(50, 0), new Block(50, 10), new Block(50, 20), new Block(50, 30)]),
                   new Piece([new Block(50, 0), new Block(50, 10), new Block(60, 10), new Block(60, 20)]),
                   new Piece([new Block(50, 0), new Block(50, 10), new Block(50, 20), new Block(60, 20)]),
                   new Piece([new Block(50, 0), new Block(50, 10), new Block(50, 20), new Block(60, 10)])];
 var playArea = new PlayArea(210, 310);
 var piece = randomPiece();
 
 function randomColor(){
   return "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
 } 


 function drawBlock(block){
   context.fillStyle = block.color;
   context.fillRect(block.x + 1, block.y + 1, 8, 8);
 }

  function update(){
    if (piece.landed()){
      if (piece.reachedTop()){
        lost = true;
      } else {
          playArea.land(piece);
          piece = randomPiece();
      }
    }
    if (lost == false){
      piece.update();
    }
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
  }, 10);
 }
}

function playGame(){
  var game = new Game();
  game.play();
}