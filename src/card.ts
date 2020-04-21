class Card {
  value: number;
  suit: string;
  constructor(value: number, suit: string) {
    this.value = value;
    this.suit = suit;
  }
}

class Deck {
  static suits = ['heart', 'spade', 'diamond', 'club'];
  cards: Card[] = [];
  constructor() {
    Deck.suits.forEach(suit => {
      for (let i = 1; i < 14; i++) {
        this.cards.push(new Card(i, suit));
      }
    });
  }
  showDeck = () => {
    console.log(this.cards);
  };
  drawCard = () => {
    return this.cards.pop();
  };
  drawCards = (numberOfCards: number) => {
    const splitIndex = this.cards.length - numberOfCards;
    const cardsToReturn = this.cards.slice(splitIndex);
    this.cards.splice(splitIndex, numberOfCards);
    return cardsToReturn;
  };
}

class Player {
  hand: Card[] = [];
  constructor(startingHand?: Card[]) {
    if (startingHand) {
      this.hand = startingHand;
    }
  }

  showHand = () => console.log(this.hand);
  addCardToHand = (card: Card) => this.hand.push(card);
}

const deck = new Deck();
const player = new Player(deck.drawCards(5));
player.addCardToHand(deck.drawCard());
deck.showDeck();
player.showHand();
