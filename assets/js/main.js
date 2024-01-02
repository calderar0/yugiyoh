const state = {
    score:{
        playerScore: 0,
        botScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-img"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        bot: document.getElementById("bot-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        bot: "bot-cards",
        botBox: document.querySelector("#bot-cards"),
    },    
    actions:{
        button: document.getElementById("next-duel"),
    },
};




const cardData = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: "../icons/dragon.png",
        winOf: [1],
        loseOf:[2],
    },
    {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: "../icons/magician.png",
        winOf: [2],
        loseOf:[0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: "../icons/exodia.png",
        winOf: [0],
        loseOf:[1],
    }
];

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "/projects/yugiyoh/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player1){
        cardImage.addEventListener("mouseover", ()=>{
            drawSelectedCard(idCard);
        });
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }


    return cardImage;
}

async function setCardsField(cardId){
    await removeAllCardsImg();


    let botCardId = await getRandomCardId();

    await showHiddenCardFields(true);

    await hiddenCardDetails();

    await drawCardsInfield(cardId, botCardId);

    let duelResult = await checkDuelResult(cardId, botCardId);
    
    await updateScore();
    await drawButton(duelResult);
}

async function drawCardsInfield(cardId, botCardId){
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.bot.src = cardData[botCardId].img;
}

async function showHiddenCardFields(value){
    if(value === true){
        state.fieldCards.player.style.display = "block";
        state.fieldCards.bot.style.display = "block";
    }
    if(value === false){
        state.fieldCards.player.style.display = "none";
        state.fieldCards.bot.style.display = "none";
    }
} 


async function hiddenCardDetails() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.botScore}`;
}

async function drawButton(text){
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function checkDuelResult(playerCardId, BotCardId){
    let duelResult = "DRAW";
    let playerCard = cardData[playerCardId];

    if(playerCard.winOf.includes(BotCardId)){
        duelResult = "WIN";
        state.score.playerScore++;
    }

    if(playerCard.loseOf.includes(BotCardId)){
        duelResult = "LOSE";
        state.score.botScore++;
    }
    await playAudio(duelResult);

    return duelResult;

}

async function removeAllCardsImg(){
    let cards = state.playerSides.botBox;
    let imageElements = cards.querySelectorAll("img");
    imageElements.forEach((img)=>img.remove());


    cards = state.playerSides.player1Box;
    imageElements = cards.querySelectorAll("img");
    imageElements.forEach((img)=>img.remove());
}

async function drawSelectedCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers ; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.bot.style.display = "none";

    init();
}

async function playAudio(status){
    const audio = new Audio(`../audios/${status}.wav`);
    try{
        audio.play();
    }catch{}
}

function init(){
    showHiddenCardFields(false);
    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.bot);


    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();


