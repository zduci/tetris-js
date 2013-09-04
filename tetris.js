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
  }
  Block.prototype.decreaseHeight = function(){
    this.y += 10;
  }
  Block.prototype.moveLeft = function(){
    this.x -= 10;
  }
  Block.prototype.moveRight = function(){
    this.x += 10;
  }

  var Piece = function(blocks){
    this.blocks = blocks;
  }

  Piece.prototype.draw = function(){
    this.blocks.forEach(drawBlock);
  }

  Piece.prototype.update = function(){
    this.blocks.forEach(function(block) { 
      block.decreaseHeight(); 
    });
  }

  Piece.prototype.landed = function(){
    if (landedOnBottom(this.blocks)){
      return true;
    } else {
      return landedOnOtherPieces(this.blocks, playArea.blocks);
    }
  }

  function landedOnBottom(blocks){
    return blocks.some(function(block){
      return block.y == playArea.height;
    });
  }

  function landedOnOtherPieces(pieceBlocks, areaBlocks){
    return checkForCollision(pieceBlocks, areaBlocks, function(pieceBlock, areaBlock){
        return areaBlock.y - 10 == pieceBlock.y && areaBlock.x == pieceBlock.x;
    });
  }

  Piece.prototype.reachedTop = function(){
    return piece.blocks.some(function(block){
      return block.y == 10;
    });
  }

  Piece.prototype.canMoveLeft = function(playArea){
    var cannotMove = checkForCollision(this.blocks, playArea.blocks, function(pieceBlock, areaBlock){
      return areaBlock.x + 10 == pieceBlock.x && areaBlock.y == pieceBlock.y;
    });
    return !cannotMove;
  }

  Piece.prototype.canMoveRight = function(playArea){
    var cannotMove = checkForCollision(this.blocks, playArea.blocks, function(pieceBlock, areaBlock){
      return areaBlock.x - 10 == pieceBlock.x && areaBlock.y == pieceBlock.y;
    });
    return !cannotMove;
  }

  function checkForCollision(pieceBlocks, areaBlocks, collisionCheck){
    return pieceBlocks.some(function(pieceBlock){
      return areaBlocks.some(function(areaBlock){
        return collisionCheck(pieceBlock, areaBlock);
      });
    });
  }

  Piece.prototype.left = function(){
    this.blocks.forEach(function(block){
      block.moveLeft();
    });
  }

  Piece.prototype.right = function(){
    this.blocks.forEach(function(block){
      block.moveRight();
    });
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
  }

  PlayArea.prototype.draw = function(){
    this.blocks.forEach(drawBlock);
  }

  PlayArea.prototype.land = function(piece){
    this.blocks = this.blocks.concat(piece.blocks);
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

  function keyPressed(event){
    switch (event.keyCode) {
      case 37:
        if (piece.canMoveLeft(playArea)){
          piece.left();
        }
        break;
      case 39:
        if (piece.canMoveRight(playArea)){
          piece.right();
        }
        break;
      case 90:
        console.log("Rotate");
        break;
    }
  }

  this.play = function(){
    window.addEventListener('keydown', keyPressed, true);
    setInterval(function(){
      update();
      draw();
    }, 100);
  }
}

function playGame(){
  var game = new Game();
  game.play();
}
