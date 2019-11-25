
//minesweeper game.  board with sizexsize board.  randomly seeded with bombs,
// according to a certain density.  Non bomb squares are marked with a number,
// equal to the number of bombs neighboring it.  zero is just blank.  
// I think I need a data structure, that represents the board (2d array)
// then clicks can just give back the coordinates as attr.  I think I just
// build the board, populate the bombs, populate the numbers, and then 
// cover everything with grey.  Then a click returns the x,y and the block is
// recolored as a bomb or number.  The hard part will be recursively uncovering
// neighboring blank squares...


var bomb_density = .2;
var board_size = 20;
var bomb_number = Math.round(board_size * board_size * bomb_density);
var index = 0;

var board_array = Create2DArray(board_size, board_size);  //blank
build_blank_array(board_size);          //initing to zeros

place_bombs(board_size);                //randomly place bombs
console.log(board_array);
console.log(index);
//debugger;
place_numbers(board_size);              //numbers
console.log(board_array);
build_board(board_size);




function place_numbers(size) {
    //for each square, go around each of the 9 surrounding squares.
    //add up an index and place that number in the square.
    var new_row;
    var new_square;
    var count = 0;

    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            if (board_array[x][y] != 10) {
                count = 0;

                if ((x == 0) && (y == 0)) {
                    if (board_array[x][y + 1] == 10) { count++; }
                    if (board_array[x + 1][y] == 10) { count++; }
                    if (board_array[x + 1][y + 1] == 10) { count++; }
                } else if ((x == size - 1) && (y == size - 1)) {
                    if (board_array[x - 1][y - 1] == 10) { count++; }
                    if (board_array[x - 1][y] == 10) { count++; }
                    if (board_array[x][y - 1] == 10) { count++; }
                } else if ((x == 0) && (y == size - 1)) {
                    if (board_array[x][y - 1] == 10) { count++; }
                    if (board_array[x + 1][y - 1] == 10) { count++; }
                    if (board_array[x + 1][y] == 10) { count++; }
                } else if ((x == size - 1) && (y == 0)) {
                    if (board_array[x - 1][y] == 10) { count++; }
                    if (board_array[x - 1][y + 1] == 10) { count++; }
                    if (board_array[x][y + 1] == 10) { count++; }
                } else if (x == 0) {
                    if (board_array[x][y - 1] == 10) { count++; }
                    if (board_array[x][y + 1] == 10) { count++; }
                    if (board_array[x + 1][y - 1] == 10) { count++; }
                    if (board_array[x + 1][y] == 10) { count++; }
                    if (board_array[x + 1][y + 1] == 10) { count++; }
                } else if (y == 0) {
                    if (board_array[x - 1][y] == 10) { count++; }
                    if (board_array[x - 1][y + 1] == 10) { count++; }
                    if (board_array[x][y + 1] == 10) { count++; }
                    if (board_array[x + 1][y] == 10) { count++; }
                    if (board_array[x + 1][y + 1] == 10) { count++; }
                } else if (y == size - 1) {
                    if (board_array[x - 1][y - 1] == 10) { count++; }
                    if (board_array[x - 1][y] == 10) { count++; }
                    if (board_array[x][y - 1] == 10) { count++; }
                    if (board_array[x + 1][y - 1] == 10) { count++; }
                    if (board_array[x + 1][y] == 10) { count++; }
                } else if (x == size - 1) {
                    if (board_array[x - 1][y - 1] == 10) { count++; }
                    if (board_array[x - 1][y] == 10) { count++; }
                    if (board_array[x - 1][y + 1] == 10) { count++; }
                    if (board_array[x][y - 1] == 10) { count++; }
                    if (board_array[x][y + 1] == 10) { count++; }
                } else {
                    if (board_array[x - 1][y - 1] == 10) { count++; }
                    if (board_array[x - 1][y] == 10) { count++; }
                    if (board_array[x - 1][y + 1] == 10) { count++; }
                    if (board_array[x][y - 1] == 10) { count++; }
                    if (board_array[x][y + 1] == 10) { count++; }
                    if (board_array[x + 1][y - 1] == 10) { count++; }
                    if (board_array[x + 1][y] == 10) { count++; }
                    if (board_array[x + 1][y + 1] == 10) { count++; }
                }
                board_array[x][y] = count;        //0-9 is neighbors.  10 is a bomb
            }
        }
    }
}



function build_blank_array(size) {
    var new_row;
    var new_square;

    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            board_array[x][y] = 0;        //0-9 is neighbors.  10 is a bomb
        }
    }
}

function place_bombs(size) {
    var new_row;
    var new_square;
    var this_bomb;
    //first randomly place (size*size)*density bombs.  Then based on that place
    //numbers.
    //this isn't quite right since it will place a random number, centered on the right
    //amount.
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            this_bomb = Math.random() * board_size * board_size;
            if (this_bomb < bomb_number) {
                board_array[x][y] = 10;
                index++;
            }
        }
    }
}





function build_board(size) {
    var new_row;
    var new_square;

    for (var y = 0; y < size; y++) {
        new_row = $("<div></div>");
        $(new_row).addClass("row");
        for (var x = 0; x < size; x++) {
            new_square = $("<div></div>");
            $(new_square).addClass("col game_square_closed game_square");
            $(new_square).attr("x", x);
            $(new_square).attr("y", y);
            $(new_square).attr("content", board_array[x][y]);
            $(new_square).attr("flag", false);
            $(new_square).attr("question", false);
            $(new_square).text(board_array[x][y]);
            $(new_row).append(new_square);
        }
        $(".game_board").append(new_row);
    }
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}


function Create2DArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }

    return arr;
}

$(".game_square_closed").on("click", function () {

    // alert($(this).attr("content"));
    //console.log(this);
    $(this).removeClass("game_square_closed");
    $(this).addClass("game_square");

    //debugger;
    var value = $(this).attr("content");

    switch (value) {
        case "0":
            $(this).addClass("open0")
            break;
        case "1":
            $(this).addClass("open1")
            break;
        case "2":
            $(this).addClass("open2")
            break;
        case "3":
            $(this).addClass("open3")
            break;
        case "4":
            $(this).addClass("open4")
            break;
        case "5":
            $(this).addClass("open5")
            break;
            case "10":
                $(this).addClass("open_red_bomb")
                break;
        default:
            break;
    }

    
})

$(".btn-new-game").on("click", function () {
    
    


})


$(".game_square_closed").on("contextmenu", function () {

    event.preventDefault();  //prevent the browser context menu from popping up


   if ($(this).attr("flag")=="true"){
    $(this).attr("flag",false);
    $(this).attr("question",true);
    $(this).addClass("closed_question");
    $(this).removeClass("closed_flag");

   } else  if ($(this).attr("question")=="true"){
    $(this).attr("flag",false);
    $(this).attr("question",false);
    $(this).addClass("closed_question");
    $(this).removeClass("closed_question");

} else {
    $(this).attr("flag",true);
    $(this).attr("question",false);
    $(this).addClass("closed_flag");
    $(this).removeClass("closed_question");
  
   }

})