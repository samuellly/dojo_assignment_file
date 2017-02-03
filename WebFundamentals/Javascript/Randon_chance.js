function game(gamble,leave)
{
    while(gamble>0 && gamble<=leave){
        gamble--;
        if( Math.floor(Math.random()*100+1)==21){
            gamble+=Math.floor(Math.random()*51)+50;
            console.log("$$$Jack Pot$$$"+gamble);
        }
        else{
            console.log("You are not winner"+gamble);
        }
    }
    console.log(gamble);
}
game(100,150);
