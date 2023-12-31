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
    actions:{
        button: document.getElementById("next-duel"),
    },
};

const playerSides = {
    player1: "player-cards",
    bot: "bot-cards",
};


const cardData = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: "/projects/yugiyoh/assets/icons/dragon.png",
        winOf: [1],
        loseOf:[2],
    },
    {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: "/projects/yugiyoh/assets/icons/magician.png",
        winOf: [2],
        loseOf:[0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: "/projects/yugiyoh/assets/icons/exodia.png",
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

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("mouseover", ()=>{
            drawSelectedCard(idCard);
        });
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }


    return cardImage;

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






function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.bot);
}

init();


