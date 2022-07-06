const FRONT = "cardFront"
const BACK = "cardBack"
const CARD = "card";
const ICON = "icon"
const ICONBACK ="iconBack"

let cards = []

iniciaJogo();
function iniciaJogo(){
    cards = game.criarCartasAnimais(game.animais)
    game.embaralhaCartas(game.cards)
    
    iniciaCartas(game.cards);
}

function iniciaCartas(cards){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = ""
    game.cards.forEach(card=>{
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon;

        createCartContent(card, cardElement)

        cardElement.addEventListener('click', viraCarta)
        gameBoard.appendChild(cardElement);
    })
}

function createCartContent(card, cardElement ){

    criandoCartaFace(FRONT, card, cardElement);
    criandoCartaFace(BACK, card, cardElement);


}

function criandoCartaFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face)
    if (face === FRONT ){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        
        iconElement.src = "./assets/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);

    }else { let iconElementBack = document.createElement("img");
    iconElementBack.classList.add(ICON);
    iconElementBack.classList.add("iconSize")
    iconElementBack.src = "./assets/back.png";
    cardElementFace.appendChild(iconElementBack);

    }
    element.appendChild(cardElementFace);
}


function criandoAtrasCarta(){}





function viraCarta(){
    
    if( game.setCard(this.id)){
    
    this.classList.add('flip');
    if(game.secondCard){
    if (game.checkMatch()){
        game.clearCards();
        if(game.checkGameOver()){
            let gameOver = document.getElementById("acabou");
            gameOver.style.display = "inline-block";
        }
    }
    else {
        setTimeout(()=>{
        
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id);

        firstCardView.classList.remove('flip');
        secondCardView.classList.remove('flip');
        game.unflipCards();

    }, 1000 )
    }
}
}
}
function restart(){
    game.clearCards()
    iniciaJogo();
    let gameOver = document.getElementById("acabou");
            gameOver.style.display = "none";
}