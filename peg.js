(function(){

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

    var board = document.getElementById('board');
    var ctx = board.getContext('2d');
    
    var width = board.width, height = board.height;

    var bgImage = new Image();
    bgImage.addEventListener('load', drawBoard, false);
    bgImage.src = 'woodgrain.jpg';
    
    function drawBoard(){
        drawBackground();
        drawPegHoles();
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
})();

