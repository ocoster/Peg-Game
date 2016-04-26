(function(){

    var board = document.getElementById('board');
    var ctx = board.getContext('2d');

    var bgImage = new Image();
    bgImage.addEventListener('load', drawBackground, false);
    bgImage.src = 'woodgrain.jpg';
    function drawBackground(){
        ctx.drawImage(bgImage, 0, 0);        
    }

    function canvasClick(ev){
        // draw a red circle here
        var oldFillStyle = ctx.fillStyle;
        
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(ev.clientX, ev.clientY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = oldFillStyle;
    }

    board.addEventListener('click', canvasClick, false);
})();

