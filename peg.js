(function(){

    var board = document.getElementById('board');
    var ctx = board.getContext('2d');

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
       
       drawPegHole(25, 75);
       drawPegHole(62.5, 75);
       drawPegHole(100, 75);
       drawPegHole(137.5, 75);
       drawPegHole(175, 75);
       
       drawPegHole(43.75, 50);
       drawPegHole(81.25, 50);
       drawPegHole(118.75, 50);
       drawPegHole(156.25, 50);
       
       drawPegHole(43.75, 100);
       drawPegHole(81.25, 100);
       drawPegHole(118.75, 100);
       drawPegHole(156.25, 100);
       
       drawPegHole(62.5, 25);
       drawPegHole(137.5, 25);
       
       drawPegHole(62.5, 125);
       drawPegHole(137.5, 125);
       
       ctx.filter = oldFilter;
       ctx.fillStyle = oldFillStyle; 
    }
    
    function drawPegHole(x, y){
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 2 * Math.PI);
        ctx.fill(); 
    }
})();

