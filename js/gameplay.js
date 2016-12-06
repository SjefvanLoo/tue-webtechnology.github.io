$(document).ready(function(){
    $(".playingarea_cell").click(function(){
        clickCell(this);
    });
    $("#btn_scramble").click(function(){
        scramble();
    });
    //start of with a scramble
    scramble();
});

function clickCell(cell){
    var x = getX(cell);
    var y = getY(cell);
    var cell0 = get0Cell();
    var cell0x = getX(cell0);
    var cell0y = getY(cell0);
    
    if(isAdjacent(x,y,cell0x,cell0y)){
        //move the piece to the empty square
        swap(cell, cell0);
        if(isSolved()){
            $(".solved").show();
        }
    }
}

function reset(){
    $(".solved").hide();
    $(".playingarea_cell").each(function(){
        $(this).empty();
        var number = (getY(this) - 1) * 4 + getX(this);
        if(number <= 15){
            // create a new element representing the piece
            $(this).append($("<div/>").addClass("playing-piece").html("<img src='img/" + number + ".png' class='number_img'/>"));
            $(this).data('content', number);
        } else {
            $(this).data('content', 0);
        }
    });
}

function scramble(){
    reset();
    //start with the finished position and make 200 random moves to scramble the puzzle
    for(var i = 0;i<200;i++){
        var cell0 = get0Cell();
        var cell0x = getX(cell0);
        var cell0y = getY(cell0);
        var x,y;
        do{
            //keep selecting pieces at random until we have a valid piece
            //This should be optimized..
            x = Math.ceil(Math.random() * 4);
            y = Math.ceil(Math.random() * 4);
        }
        while(!isAdjacent(cell0x, cell0y, x, y));
        
        var cell = getCellByXY(x, y);
        swap(cell, cell0);
    }
}

function isSolved(){
    var solved = true;
    $(".playingarea_cell").each(function(){
        var x = getX(this);
        var y = getY(this);
        var content = $(this).data('content');
        if(((y - 1) * 4 + x) % 16 != content){
            solved = false;
        }
    });
    return solved;
}
function swap(cell1, cell2){
    var content1 = $(cell1).data('content');
    var content2 = $(cell2).data('content');
    $(cell1).data('content', content2);
    $(cell2).data('content', content1);
    
    var contents1 = $(cell1).contents();
    var contents2 = $(cell2).contents();
    $(cell1).empty();
    $(cell2).empty();
    $(cell1).append(contents2);
    $(cell2).append(contents1);
}

function getX(cell){
    var n = parseFloat($(cell).data('pos'));
    n = n - Math.floor(n);
    return Math.round(n * 10);
}

function getY(cell){
    var n = parseFloat($(cell).data('pos'));
    return Math.floor(n);
}

function getCellByXY(x, y){
    var cell;
    var pos = y + x/10;
    $(".playingarea_cell").each(function(){
        if($(this).data('pos') == pos)
            cell = $(this);
    });
    return cell;
}
function get0Cell(){
    var cell0;
    $(".playingarea_cell").each(function(){
        if($(this).data('content') == 0)
            cell0 = $(this);
    });
    return cell0;
}

function isAdjacent(x1, y1, x2, y2){
    if(Math.abs(x1 - x2) === 1 && y1 === y2)
        return true;
    if(Math.abs(y1 - y2) === 1 && x1 === x2)
        return true;
    return false;
}
