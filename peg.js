(function(){
    var color1 = Symbol('color1');
    var color2 = Symbol('color2');
    
    var pegHoleData = [
        { y: 3/6, x: 0.1, color1Moves: { up: 1, down: 2 }, color2Moves: {} },
        { y: 2/6, x: 0.2, color1Moves: { up: 3, down: 4 }, color2Moves: { down: 0 } },
        { y: 4/6, x: 0.2, color1Moves: { up: 4, down: 5 }, color2Moves: { up : 0 } },
        { y: 1/6, x: 0.3, color1Moves: { down: 6 }, color2Moves: { down: 1 } },
        { y: 3/6, x: 0.3, color1Moves: { up: 6, down: 7 }, color2Moves: { up: 1, down: 2 } },
        { y: 5/6, x: 0.3, color1Moves: { up: 7 }, color2Moves: { up: 2 } },
        { y: 2/6, x: 0.4, color1Moves: { down: 8 }, color2Moves: { up: 3, down: 4 } },
        { y: 4/6, x: 0.4, color1Moves: { up: 8 }, color2Moves: { up: 4, down: 5 } },
        { y: 3/6, x: 0.5, color1Moves: { up: 9, down: 10 }, color2Moves: { up: 6, down: 7 } },
        { y: 2/6, x: 0.6, color1Moves: { up: 11, down: 12 }, color2Moves: { down: 8 } },
        { y: 4/6, x: 0.6, color1Moves: { up: 12, down: 13 }, color2Moves: { up: 8 } },
        { y: 1/6, x: 0.7, color1Moves: { down: 14 }, color2Moves: { down: 9 } },
        { y: 3/6, x: 0.7, color1Moves: { up: 14, down: 15 }, color2Moves: { up: 9, down: 10 } },
        { y: 5/6, x: 0.7, color1Moves: { down: 15 }, color2Moves: { up: 10 } },
        { y: 2/6, x: 0.8, color1Moves: { down: 16 }, color2Moves: { up: 11, down: 12 } },
        { y: 4/6, x: 0.8, color1Moves: { up: 16 }, color2Moves: { up: 12, down: 13 } },
        { y: 3/6, x: 0.9, color1Moves: {}, color2Moves: { up: 14, down: 15 } }
    ];
    
    var pegs = [
            { holeIdx: 0, color: color1 },
            { holeIdx: 1, color: color1 },
            { holeIdx: 2, color: color1 },
            { holeIdx: 3, color: color1 },
            { holeIdx: 4, color: color1 },
            { holeIdx: 5, color: color1 },
            { holeIdx: 6, color: color1 },
            { holeIdx: 7, color: color1 },
            { holeIdx: 9, color: color2 },
            { holeIdx: 10, color: color2 },
            { holeIdx: 11, color: color2 },
            { holeIdx: 12, color: color2 },
            { holeIdx: 13, color: color2 },
            { holeIdx: 14, color: color2 },
            { holeIdx: 15, color: color2 },
            { holeIdx: 16, color: color2 }
    ];
    
    var emptyPegIdx = 8;

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
        drawPegs();
    }
    
    function drawBackground(){
        // todo: make into a pattern
        ctx.drawImage(bgImage, 0, 0);        
    }
    
    function drawPegHoles(){
       var oldFillStyle = ctx.fillStyle;
       var oldFilter = ctx.filter;
       
       ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
       
       drawPegHole(width * pegHoleData[emptyPegIdx].x, height * pegHoleData[emptyPegIdx].y);
       
       ctx.filter = oldFilter;
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
    
    function drawPegs(){
       var oldFillStyle = ctx.fillStyle;
       var oldFilter = ctx.filter;
       
       pegs.forEach(function(item){
           ctx.fillStyle = item.color == color1 ? 'red' : 'green';
           drawPeg(width * pegHoleData[item.holeIdx].x, height * pegHoleData[item.holeIdx].y);
       });
       
       ctx.filter = oldFilter;
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
        
        if(moves.up == emptyPegIdx || moves.down == emptyPegIdx) {
            return true;
        } else {
            var upPeg = getPegAtHole(moves.up);
            var downPeg = getPegAtHole(moves.down);
            
            var movesForUpPeg = getValidMoves(upPeg, peg.color);
            var movesForDownPeg = getValidMoves(downPeg, peg.color);
            
            if (upPeg && upPeg.color != peg.color && movesForUpPeg.up === emptyPegIdx){
                return true;
            } else if (downPeg && downPeg.color != peg.color && movesForDownPeg.down === emptyPegIdx){
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

