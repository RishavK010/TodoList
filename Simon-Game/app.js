let gameSeq=[];
let userSeq=[];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;

function updateHighScore() {
    document.getElementById("high-score").innerText = highScore;
}

function playSound(key){
    let url;
    switch (key) {
        case "red":
            url = "sounds/red.mp3";
            break;
        case "green":
            url = "sounds/green.mp3";
            break;
        case "purple":
            url = "sounds/purple.mp3";
            break;
        case "yellow":
            url = "sounds/yellow.mp3";
            break;
        case "wrong":
            url = "sounds/wrong.mp3";
            break;
    
        default:
            break;
    }
    let audio = new Audio(url);
    audio.play();
    pressAnimation(key);
}

function pressAnimation(key){
    $("#"+key).addClass("pressed");
    setTimeout(function() {
        $("#"+key).removeClass("pressed");
    },100);
}

let h2 = document.querySelector("h2");
 
document.addEventListener("keypress",function() {
    if(started==false){
        started = true;

        score = 0;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);

    gameSeq.forEach((color, idx) => {
        setTimeout(() => {
            pressAnimation(color);
            playSound(color);
        }, 1000 * idx);
    });

    btnFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx]===gameSeq[idx]){
        score++;
        if(userSeq.length == gameSeq.length)
        setTimeout(levelUp, 1000);
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${score}</b> <br>Press any key to Restart`;
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore); 
            updateHighScore();
        }

        setTimeout(function() {
            body.style.backgroundColor = "#011F3F";
        }, 200);

        reset();
        playSound("wrong");
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
    playSound(userColor);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

updateHighScore();