function init(player,opponent){
    const canvas=document.getElementById("cvs");
    const ctx=canvas.getContext("2d");
    
const gameoverElement=document.querySelector(".gameover");
    
    let board=[];
    const column=3;
    const row=3;
    const spacesize=150;
 

    let gamedata=new Array(9);
    let currentplayer=player.man;

    const ximage=new Image();
    ximage.src="image/X.png";
    const oimage=new Image();
    oimage.src="image/O.png";

    const wins=[
        [0,1,2],[0,4,8],[6,4,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]
    ];

    let gameover=false;

    function drawBoard(){
        let id=0;
        for(let i=0;i<row;i++){
        board[i]=[];
        for(let j=0;j<column;j++){
            board[i][j]=id;
            id++;
            ctx.strokeStyle="black";
            ctx.strokeRect(j*spacesize,i*spacesize,spacesize,spacesize);
        }
     }

}
drawBoard();

canvas.addEventListener("click",function(event){
    if(gameover) return;
    let x= event.clientX - canvas.getBoundingClientRect().x;
    let y=event.clientY-canvas.getBoundingClientRect().y;

    let i=Math.floor(y/spacesize);
    let j=Math.floor(x/spacesize);

    let id=board[i][j];
    if(gamedata[id]) return;
    

    gamedata[id]=currentplayer;
    drawOnBoard(currentplayer,i,j);

    if(iswinner(gamedata,currentplayer)){
        showgameover(currentplayer);
        gameover=true;
        return;
    }
    
    if(istie(gamedata)){
        showgameover("tie");
        gameover=true;
        return;}


    
    currentplayer=currentplayer==player.man?player.friend:player.man;

});

function iswinner(gamedata,player){
    for(let i=0;i<wins.length;i++){
        let won=true;
        for(let j=0;j<wins[i].length;j++){
            let id=wins[i][j];
           won=gamedata[id]==player&&won;
        }
        if(won){
            console.log("Winner detected:", player);
            return true;
        }
    }
    return false;
}
function istie(gamedata){
    let boardfill=true;
    for(let i=0;i<gamedata.length;i++){
        boardfill=gamedata[i] && boardfill
    }
    if(boardfill){
        return true;
    }
    return false;
}
function showgameover(player){
    let message = player == "tie"?"Oops no winner":"The winner is";
    if(message=="The winner is"){
        let imgsrc=`image/${player}.png`;

    gameoverElement.innerHTML=`
    <h1>${message}</h1>
    <img class="winner-img" src="${imgsrc}" ></img>
    <div class="play" onclick="location.reload()">PLAY AGAIN!!</div>
    `;
    gameoverElement.classList.remove("hide");
}else{
    gameoverElement.innerHTML=`
    <h1>${message}</h1>
    <h2>TIE</h2>
    <div class="play" onclick="location.reload()">PLAY AGAIN!!</div>
    `;
    gameoverElement.classList.remove("hide");

}
}
function drawOnBoard(player,i,j){
    let image=player == "X" ? ximage: oimage;
    const imagesize=spacesize*0.7;
    const offset=(spacesize-imagesize)/2;
    ctx.drawImage(image,j*spacesize+offset,i*spacesize+offset,imagesize,imagesize);
}
}