let game = {


    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){

        let card = this.cards.filter(card=>card.id===id)[0];

        if (card.flipped || this.lockMode){
            return false;
        }
        if (!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }
        else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true
        }
    },

    checkMatch: function (){
       if(!this.firstCard || !this.secondCard){return false}
        return this.firstCard.icon === this.secondCard.icon;

    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },
    checkGameOver(){
        return this.cards.filter(card=>!card.flipped).length == 0;
        
    },
    animais : ["cachorro",
"gato",
"vaca",
"fazendeiro",
"peixe",
"galinha",
"cavalo",
"pato",
"porco",
"ovelha"] ,
 
cards : null,

criarCartasAnimais:function (animais){
    this.cards = []
    for (let animal of animais){
        this.cards.push(this.criarParesDeAnimal(animal));
    } 
    this.cards = this.cards.flatMap(pair => pair)
    this.embaralhaCartas();
    
},

criarParesDeAnimal:function (animal){
    return[{
        id: this.criaIDAnimal(animal) ,
        icon:animal,
        flipped:false },
        {
            id: this.criaIDAnimal(animal) ,
            icon:animal,
            flipped:false }]

},

criaIDAnimal:function (animal){
    return animal + parseInt(Math.random()*1000)


},

embaralhaCartas:function (cards){
    let atualIndex = this.cards.length
    let randomIndex = 0;

    while (atualIndex !== 0){
        randomIndex = Math.floor(Math.random() * atualIndex);
        atualIndex -- ;
        [this.cards[randomIndex], this.cards[atualIndex]] = [this.cards[atualIndex], this.cards[randomIndex]]
    }

}

}