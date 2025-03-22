document.addEventListener("DOMContentLoaded", function(){
const options=document.querySelector(".options");
  
const gameoverElement=document.querySelector(".gameover");

const computerbtn=options.querySelector(".computer");
const friendbtn=options.querySelector(".friend");
const xbtn=options.querySelector(".x");
const obtn=options.querySelector(".o");
const playbtn=options.querySelector(".play");

let OPPONENT;
const player = new Object();

computerbtn.addEventListener("click", function(){
    OPPONENT = "computer";
    switchActive(friendbtn, computerbtn);
    computerbtn.classList.remove("red");
    friendbtn.classList.remove("red");
});
friendbtn.addEventListener("click", function(){
    OPPONENT = "friend";
    switchActive(computerbtn, friendbtn);
    friendbtn.classList.remove("red");
    computerbtn.classList.remove("red");
});
xbtn.addEventListener("click",function(){
    player.man="X";
    player.computer="O";
    player.friend="O";
    switchActive(obtn,xbtn);
    obtn.classList.remove("red");
    xbtn.classList.remove("red");  
});
obtn.addEventListener("click",function(){
    player.man="O";
    player.computer="X";
    player.friend="X";
    switchActive(xbtn,obtn);
    xbtn.classList.remove("red");
    obtn.classList.remove("red");
});
playbtn.addEventListener("click",function(){
    console.log("Opponent selected:", OPPONENT);
    console.log("Computer button classes:", computerbtn.classList);
    console.log("Friend button classes:", friendbtn.classList);
    console.log("player selected:",player.man);
    let missingselect=false;
    if(!OPPONENT){
        computerbtn.classList.add("red");
        friendbtn.classList.add("red");
        missingselect=true;
    }
    if(!player.man){
        xbtn.classList.add("red");
        obtn.classList.add("red");
        missingselect=true;
    }
    if(missingselect) return;
  
    init( player,OPPONENT);
    options.classList.add("hide");

});
function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}
});