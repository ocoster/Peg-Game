(function(){
    var color1 = Symbol('color1');
    var color2 = Symbol('color2');
    
    var pegHoleRelativeCoordinates = [
        { y: 3/6, x: 0.1 },
        { y: 2/6, x: 0.2 },
        { y: 4/6, x: 0.2 },
        { y: 1/6, x: 0.3 },
        { y: 3/6, x: 0.3 },
        { y: 5/6, x: 0.3 },
        { y: 2/6, x: 0.4 },
        { y: 4/6, x: 0.4 },
        { y: 3/6, x: 0.5 },
        { y: 2/6, x: 0.6 },
        { y: 4/6, x: 0.6 },
        { y: 1/6, x: 0.7 },
        { y: 3/6, x: 0.7 },
        { y: 5/6, x: 0.7 },
        { y: 2/6, x: 0.8 },
        { y: 4/6, x: 0.8 },
        { y: 3/6, x: 0.9 }
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

    var board = document.getElementById('board');
    var ctx = board.getContext('2d');
    
    var width = board.width, height = board.height;

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
       
       pegHoleRelativeCoordinates.forEach(function(item, idx, arr){
           drawPegHole(width * item.x, height * item.y);
       });
       
       ctx.filter = oldFilter;
       ctx.fillStyle = oldFillStyle; 
    }
    
    function drawPegHole(x, y){
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 2 * Math.PI);
        ctx.fill(); 
        
       var oldFillStyle = ctx.fillStyle;
       ctx.fillStyle = 'black';
       ctx.arc(x, y, 8, 0, 2 * Math.PI);
       ctx.stroke();
       ctx.fillStyle = oldFillStyle; 
    }
    
    function drawPegs(){
       var oldFillStyle = ctx.fillStyle;
       var oldFilter = ctx.filter;
       
       pegs.forEach(function(item, idx, arr){
           ctx.fillStyle = item.color == color1 ? 'red' : 'green';
           drawPeg(width * pegHoleRelativeCoordinates[item.holeIdx].x, height * pegHoleRelativeCoordinates[item.holeIdx].y);
       });
       
       ctx.filter = oldFilter;
       ctx.fillStyle = oldFillStyle; 
    }
    
    function drawPeg(x, y){
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, 2 * Math.PI);
        ctx.fill(); 
    }
})();

