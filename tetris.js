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

 function randomPiece(){
    var randomPiece = Math.floor(Math.random()*pieceTypes.length);
    var randomX = Math.floor(Math.random()*22)*10;
    var blocks = [];
    
    pieceTypes[randomPiece].blocks.forEach(function(block){
      blocks.push(new Block(randomX + block.x, block.y));
    });
    return new Piece(blocks);
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
 
 var pieceTypes = [new Piece([new Block(50, 0), new Block(60, 0), new Block(60, 10), new Block(50, 10)]),
                   new Piece([new Block(50, 0), new Block(50, 10), new Block(50, 20), new Block(50, 30)]),
                   new Piece([new Block(50, 0), new Block(50, 10), new Block(60, 10), new Block(60, 20)]),
                   new Piece([new Block(50, 0), new Block(50, 10), new Block(50, 20), new Block(60, 20)]),
                   new Piece([new Block(50, 0), new Block(50, 10), new Block(50, 20), new Block(60, 10)])];
 var playArea = new PlayArea();
 var piece = randomPiece();

 function drawBlock(block){
   context.fillStyle = "rgb(200,0,0)";
   context.fillRect (block.x + 1, block.y + 1, 8, 8);
 }

  function update(){
    if (piece.landed()){
      playArea.land(piece);
      piece = randomPiece();
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