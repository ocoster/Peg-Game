(function(){
    'use strict';
    const color1 = Symbol('color1');
    const color2 = Symbol('color2');
    
     
    var pegHoleData = [
        { y: 0.5, x: 0.1, color1Moves: { right: 1 }, color2Moves: {} },
        { y: 0.5, x: 0.2, color1Moves: { right: 2 }, color2Moves: { left: 0 } },
        { y: 0.5, x: 0.3, color1Moves: { right: 3 }, color2Moves: { left: 1 } },
        { y: 0.5, x: 0.4, color1Moves: { right: 4 }, color2Moves: { left: 2 } },
        { y: 0.5, x: 0.5, color1Moves: { right: 5 }, color2Moves: { left: 3 } },
        { y: 0.5, x: 0.6, color1Moves: { right: 6 }, color2Moves: { left: 4 } },
        { y: 0.5, x: 0.7, color1Moves: { right: 7 }, color2Moves: { left: 5 } },
        { y: 0.5, x: 0.8, color1Moves: { right: 8 }, color2Moves: { left: 6 } },
        { y: 0.5, x: 0.9, color1Moves: { }, color2Moves: { left: 7 } }
    ];
    
    var pegs = [
            { holeIdx: 0, color: color1 },
            { holeIdx: 1, color: color1 },
            { holeIdx: 2, color: color1 },
            { holeIdx: 3, color: color1 },

            { holeIdx: 5, color: color2 },
            { holeIdx: 6, color: color2 },
            { holeIdx: 7, color: color2 },
            { holeIdx: 8, color: color2 }
    ];
    
    var emptyPegIdx = 4;

    var board = document.getElementById('board');
    var ctx = board.getContext('2d');
    
    var width = board.width, height = board.height;
    var pegHoleRadius = 7, borderWidth = 1, pegRadius = pegHoleRadius + 2 * borderWidth;

    var bgImage = new Image();
    bgImage.addEventListener('load', drawBoard, false);
    bgImage.src = 'woodgrain.jpg';
    
    function drawBoard(){
        drawBackground();
        drawPegHoles();
        drawBoardLines()
        drawPegs();
    }
    
    function drawBackground(){
        // todo: make into a pattern
        ctx.drawImage(bgImage, 0, 0);        
    }
    
    function drawPegHoles(){
       var oldFillStyle = ctx.fillStyle;
       
       ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
       
       drawPegHole(width * pegHoleData[emptyPegIdx].x, height * pegHoleData[emptyPegIdx].y);
       
       ctx.fillStyle = oldFillStyle; 
    }
    
    function drawPegHole(x, y){
        ctx.beginPath();
        ctx.arc(x, y, pegHoleRadius, 0, 2 * Math.PI);
        ctx.fill(); 
        
       var oldFillStyle = ctx.fillStyle;
       ctx.fillStyle = 'black';
       ctx.arc(x, y, pegHoleRadius + borderWidth, 0, 2 * Math.PI);
       ctx.stroke();
       ctx.fillStyle = oldFillStyle; 
    }
    
    function drawBoardLines(){

       var oldFillStyle = ctx.fillStyle;
       var oldLineWidth = ctx.lineWidth;
       ctx.fillStyle = 'black';
       
       ctx.beginPath();
       ctx.lineWidth = borderWidth * 2;
       var dX = (pegHoleData[0].x - pegHoleData[1].x) * width;
       var dY = (pegHoleData[0].y - pegHoleData[1].y) * height;
       var len = Math.sqrt(dX * dX + dY * dY);
       
       var dx = (pegHoleRadius + borderWidth) / len * dX;
       var dy = (pegHoleRadius + borderWidth) / len * dY;
       
       pegHoleData.forEach(function(item){
           if(item.color1Moves.right){
               var rightPegData = pegHoleData[item.color1Moves.right];
               ctx.moveTo(item.x * width - dx, item.y * height - dy); 
               ctx.lineTo(rightPegData.x * width + dx, rightPegData.y * height + dy);
           }
       });
 
       ctx.stroke();
       
       ctx.lineWidth = oldLineWidth;
       ctx.fillStyle = oldFillStyle;
    }
    
    function drawPegs(){
       var oldFillStyle = ctx.fillStyle;
       
       pegs.forEach(function(item){
           ctx.fillStyle = item.color == color1 ? 'red' : 'green';
           drawPeg(width * pegHoleData[item.holeIdx].x, height * pegHoleData[item.holeIdx].y);
       });
       
       ctx.fillStyle = oldFillStyle; 
    }
    
    function drawPeg(x, y){
        ctx.beginPath();
        ctx.arc(x, y, pegRadius, 0, 2 * Math.PI);
        ctx.fill(); 
    }
    
    function getPegAtHole(idx){
        if (idx === undefined)
            return undefined;
        if (idx === emptyPegIdx)
            return undefined;
        
        var pegAtHole = pegs.filter(function(item){
            return item.holeIdx === idx;
        });
        
        return pegAtHole[0];
    }
    
    function movePeg(peg)
    {
        var temp = emptyPegIdx;
        emptyPegIdx = peg.holeIdx;
        peg.holeIdx = temp; 
    }
    
    function getValidMoves(peg, color){
        if(!peg){
            return {};
        }
        
        if(!color){
            color = peg.color;
        }
        
        if(color == color1){
            return pegHoleData[peg.holeIdx].color1Moves;
        } else if(color == color2){
            return pegHoleData[peg.holeIdx].color2Moves
        } 
        
        return {};
    }
    
    function hasValidMove(peg){
        var moves = getValidMoves(peg);
        
        if(moves.right == emptyPegIdx || moves.left == emptyPegIdx) {
            return true;
        } else {
            var rightPeg = getPegAtHole(moves.right);
            var leftPeg = getPegAtHole(moves.left);
            
            var movesForRightPeg = getValidMoves(rightPeg, peg.color);
            var movesForLeftPeg = getValidMoves(leftPeg, peg.color);
            
            if (rightPeg && rightPeg.color != peg.color && movesForRightPeg.right === emptyPegIdx){
                return true;
            } else if (leftPeg && leftPeg.color != peg.color && movesForLeftPeg.left === emptyPegIdx){
                return true;
            }            
        }
        
        return false;
    }
    
    function movePegIfValidMoveExists(peg){
        if(hasValidMove(peg)){
            movePeg(peg);
        }
        
        drawBoard();
    }
    
    board.addEventListener('click', function(ev){
        var target = ev.target;
        var x = ev.clientX - target.offsetLeft, y = ev.clientY - target.offsetTop;
        
        // which peg have I clicked? What color?
        var found = pegs.filter(function(item){
            var pegDetails = pegHoleData[item.holeIdx];
            
            var dist = Math.pow(x - width * pegDetails.x, 2) + Math.pow(y - height * pegDetails.y, 2);
            
            return dist <= pegRadius * pegRadius;
        });
        
        if(found.length){
            movePegIfValidMoveExists(found[0]);
        } 
        
    }, false);
})();

