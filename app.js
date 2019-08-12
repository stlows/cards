Vue.component("my-card", {
  props: ["card"],
  methods: {
    clicked: function() {
      app.discarded.push(this.card);
    },
    cardMouseDown(e) {
      console.log(e);
    },
    cardMouseUp(e) {
      console.log(e);
    }
  },
  template: `
        <div class='card' :class='[card.suit, {inverted: card.inverted}]' @click="clicked" @mousedown="cardMouseDown" @mouseup="cardMouseUp" :title='card.value + card.suit'>
            <div class='value value-normal'>{{ card.value }}</div>
            <div class='value value-inverted'>{{ card.value }}</div>
        </div>
        `
});

Vue.component("my-hand", {
  props: ["cards"],
  template: `
    <div class="hand">
        <my-card v-for="card in cards" :card="card"></my-card>
    </div>
    `
});

Vue.component("discard-pile", {
  props: ["cards"],
  template: `
        <div class="discard-pile">
            <my-card v-for="(card, index) in cards" :card="card" :style="{left:index * 2 +'px'}"></my-card>
        </div>
    `
});

var app = new Vue({
  el: "#app",
  data: {
    title: "Cards stuff",
    values: [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"],
    suits: ["s", "h", "d", "c"],
    deck: [],
    discarded: [],
    inverted: true,
    peekDeck: true
  },
  created: function() {
    var cards = [];
    this.suits.forEach(suit => {
      this.values.forEach(value => {
        cards.push({
          value,
          suit,
          inverted: this.inverted
        });
      });
    });
    this.deck = cards;
  },
  methods: {
    shuffleDeck: function() {
      // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
      var j, x, i;
      for (i = this.deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.deck[i];
        this.deck.splice(i, 1, this.deck[j]);
        this.deck.splice(j, 1, x);
      }
    },
    changeInversion() {
      this.inverted = !this.inverted;
      for (var i = 0; i < this.deck.length; i++) {
        this.deck[i].inverted = this.inverted;
      }
    }
  }
});
