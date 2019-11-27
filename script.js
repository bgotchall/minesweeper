
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
var board_size = 15;
var bomb_number = Math.round(board_size * board_size * bomb_density);
var bomb_count;         //in this imp the actual number might vary
var blanks_count;       //once all the squares are opened except for bombs, you win.
var index = 0;
var board_array;
var game_running = true;              //false if you have died.

$(document).ready(function () {

    start_game();

    $(document).on("click", ".game_square_closed", function () {
        if (game_running) {
            //blanks_count++;
            $(this).removeClass("game_square_closed");
            $(this).addClass("game_square");

            // debugger;
            var value = $(this).attr("content");
            if (value != "10") { blanks_count--; }
            if (blanks_count == 0) {
                //here the revealed squares matches all the possible revealable squares, so you win.
                alert("you win");
                game_running = false;
            }
            switch (value) {
                case "10":
                    $(this).addClass("open_red_bomb")
                    game_running = false;
                    break;
                case "0":
                    $(this).addClass("open0")
                    var x = $(this).attr("x");
                    var y = $(this).attr("y");
                    // a blank square has been opened.  By def, no neighbor is a bomb.  Now, recursively reveal all neighboring non-bomb squares.
                    open_neighbors(x, y);
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
                case "6":
                    $(this).addClass("open6")
                    break;
                case "7":
                    $(this).addClass("open7")
                    break;
                case "8":
                    $(this).addClass("open8")
                    break;

                default:
                    break;
            }
        }
    })


    $(document).on("click", ".btn-new-game", function () {
        start_game();


    })


    $(document).on("contextmenu", ".game_square_closed", function () {
        event.preventDefault();  //prevent the browser context menu from popping up


        if ($(this).attr("flag") == "true") {
            $(this).attr("flag", false);
            $(this).attr("question", true);
            $(this).addClass("closed_question");
            $(this).removeClass("closed_flag");

        } else if ($(this).attr("question") == "true") {
            $(this).attr("flag", false);
            $(this).attr("question", false);
            $(this).addClass("closed_question");
            $(this).removeClass("closed_question");

        } else {
            $(this).attr("flag", true);
            $(this).attr("question", false);
            $(this).addClass("closed_flag");
            $(this).removeClass("closed_question");

        }

    })
});

function start_game() {
    game_running = true;
    board_array = [];
    index = 0;
    board_array = Create2DArray(board_size, board_size);  //blank
    build_blank_array(board_size);          //initing to zeros
    place_bombs(board_size);                //randomly place bombs
    //debugger;
    place_numbers(board_size);              //numbers
    build_board(board_size);

}


function open_neighbors(x, y) {
    // a blank square has been opened.  By def, no neighbor is a bomb.  Now, recursively reveal all neighboring non-bomb squares.
    console.log("opening squares at: " + x + " and " + y);
    //$("ul").find(`[data-slide='${current}']`)
    let x_column = $("div").find(`[x='${x}']`);
    console.log(x_column);
    let this_div = $(x_column.game_square).find(`[y='${y}']`);
    console.log(this_div);
}

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
    bomb_count = 0;
    blanks_count = size * size;
    //first randomly place (size*size)*density bombs.  Then based on that place
    //numbers.
    //this isn't quite right since it will place a random number, centered on the right
    //amount.
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            this_bomb = Math.random() * board_size * board_size;
            if (this_bomb < bomb_number) {
                board_array[x][y] = 10;
                bomb_count++;
                blanks_count--;
                index++;
            }
        }
    }

}


function build_board(size) {
    var new_row;
    var new_square;
    $(".game_board").empty();
    for (var y = 0; y < size; y++) {
        new_row = $("<div></div>");
        $(new_row).addClass("row");
        for (var x = 0; x < size; x++) {
            new_square = $("<div></div>");
            $(new_square).addClass("col game_square_closed game_square");
            $(new_square).removeClass("open0 open1 open2 open3");
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

