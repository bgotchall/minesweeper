









build_board();


function build_board(){
    var new_row;
    var new_square;

    for (var x=0;x<12;x++){
         new_row=$("<div></div>");
        $(new_row).addClass("row");
        for (var y=0; y<12; y++){
            new_square=$("<div></div>");
            $(new_square).addClass("col game_square");
            $(new_row).append(new_square);
        }
        $(".game_board").append(new_row);
    }
}