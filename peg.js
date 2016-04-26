var board = document.getElementById('board');
var ctx = board.getContext('2d');

ctx.rect(0, 0, 200, 100);
ctx.fillStyle = 'blue';
ctx.fill();

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
