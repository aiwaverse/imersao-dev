const paradigms = Object.freeze({
  procedural: 1,
  objectedOriented: 2,
  functional: 3,
  multi: 4
});

const complexity = Object.freeze({ low: 1, medium: 2, high: 3 });

class Attributes {
  constructor(year, paradigm, complexity) {
    this.yearOfCreation = year;
    this.paradigm = paradigm;
    this.complexityLevel = complexity;
  }
}

class Card {
  constructor(name, image, year, paradigm, complexity) {
    this.name = name;
    this.image = image;
    this.attr = new Attributes(year, paradigm, complexity);
  }
  get yearOfCreation() {
    return this.attr.yearOfCreation;
  }
  get paradigm() {
    switch (this.attr.paradigm) {
      case 1:
        return "Procedural";
      case 2:
        return "Objected Oriented";
      case 3:
        return "Functional";
      case 4:
        return "Multi Paradigm";
    }
  }
  get complexityLevel() {
    switch (this.attr.complexityLevel) {
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
    }
  }
}

function pickCards(cards, gameCards) {
  let quantity = cards.length;
  let computerNumber = parseInt(Math.random() * quantity);
  let computerCard = cards[computerNumber];
  cards.splice(computerNumber, 1);
  let playerNumber = parseInt(Math.random() * quantity - 1);
  let playerCard = cards[playerNumber];
  showCardPlayer(playerCard);
  cards.splice(playerNumber, 1);
  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;
  updateCardQuantity(cards);
  gameCards.player = playerCard;
  gameCards.computer = computerCard;
}

function getSelectedAttr() {
  let radioAttr = document.getElementsByName("attr");
  for (let i = 0; i < radioAttr.length; ++i) {
    if (radioAttr[i].checked) {
      return radioAttr[i];
    }
  }
}

function showCardPlayer(card) {
  let divCardPlayer = document.getElementById("carta-jogador");
  let frame =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  divCardPlayer.style.backgroundImage = `url(${card.image})`;
  let name = `<p class="carta-subtitle">${card.name}</p>`;
  let html = "<div id='opcoes' class='carta-status'>";
  divCardPlayer.innerHTML = frame + name + html + showPlayerAttrOnScreen(card);
}

function showCardComputer(card) {
  let divCardComputer = document.getElementById("carta-maquina");
  let frame =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  divCardComputer.style.backgroundImage = `url(${card.image})`;
  let name = `<p class="carta-subtitle">${card.name}</p>`;
  let html = "<div id='opcoes' class='carta-status'>";
  divCardComputer.innerHTML =
    frame + name + html + showComputerAttrOnScreen(card);
}

function showComputerAttrOnScreen(card) {
  let optionsText = "";
  for (let attr in card.attr) {
    let betterNames = {
      yearOfCreation: "Year of Creation",
      complexityLevel: "Complexity",
      paradigm: "Paradigm"
    };
    optionsText +=
      "<p type = 'text' name='attr', value='" +
      attr +
      "'>" +
      betterNames[attr] +
      ": " +
      card[attr] +
      "<br>";
  }
  return optionsText;
}

function showPlayerAttrOnScreen(card) {
  let optionsText = "";
  for (let attr in card.attr) {
    let betterNames = {
      yearOfCreation: "Year of Creation",
      complexityLevel: "Complexity",
      paradigm: "Paradigm"
    };
    optionsText +=
      "<input type = 'radio' name='attr', value='" +
      attr +
      "'>" +
      betterNames[attr] +
      ": " +
      card[attr] +
      "<br>";
  }
  return optionsText;
}

function play(player, computer, points, cards) {
  showCardComputer(computer);
  let selectedAttr = getSelectedAttr().value;
  let divResult = document.getElementById("resultado");
  let comparasion = {
    yearOfCreation: (a, b) => a < b,
    paradigm: (a, b) => a > b,
    complexityLevel: (a, b) => a > b
  };
  let betterNames = {
    yearOfCreation: "Year of Creation",
    complexityLevel: "Complexity",
    paradigm: "Paradigm"
  };
  let htmlResult = "";
  //console.log(player[selectedAttr] + " vs. " + computer[selectedAttr]);
  if (
    comparasion[selectedAttr](
      player["attr"][selectedAttr],
      computer["attr"][selectedAttr]
    )
  ) {
    htmlResult = '<p class="resultado-final">You Won!</p>';
    ++points.player;
  } else if (player["attr"][selectedAttr] == computer["attr"][selectedAttr]) {
    htmlResult = '<p class="resultado-final">Draw!</p>';
  } else {
    htmlResult = '<p class="resultado-final">You Lost!</p>';
    ++points.computer;
  }
  if (cards.length == 0) {
    alert("End of game!");
    if (points.player > points.computer) {
      htmlResult = '<p class="resultado-final">You Won!</p>';
    } else if (points.computer > points.player) {
      htmlResult = '<p class="resultado-final">You Lost!</p>';
    } else {
      htmlResult = '<p class="resultado-final">Draw!</p>';
    }
  } else {
    document.getElementById("btnProximaRodada").disabled = false;
  }
  divResult.innerHTML = htmlResult;
  document.getElementById("btnJogar").disabled = true;
  updateScore(points.player, points.computer);
}

function updateScore(playerPoints, computerPoints) {
  let divScore = document.getElementById("placar");
  let html = "Player " + playerPoints + "/" + computerPoints + " Computer";
  divScore.innerHTML = html;
}

function updateCardQuantity(cards) {
  let divCardsQuantity = document.getElementById("quantidade-cartas");
  let html = "Amount of cards in game: " + cards.length;
  divCardsQuantity.innerHTML = html;
}

function nextMatch() {
  let divCards = document.getElementById("cartas");
  divCards.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"> </div>`;
  document.getElementById("btnSortear").disabled = false;
  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnProximaRodada").disabled = true;
  let divResult = document.getElementById("resultado");
  divResult.innerHTML = "";
}

let cCard = new Card(
  "C",
  "https://www.pngkit.com/png/full/101-1010012_c-programming-icon-c-programming-language-logo.png",
  1972,
  paradigms.procedural,
  complexity.medium
);
let haskellCard = new Card(
  "Haskell",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Haskell-Logo.svg/1200px-Haskell-Logo.svg.png",
  1990,
  paradigms.functional,
  complexity.high
);
let javaCard = new Card(
  "Java",
  "https://i.imgur.com/2yOQJxH.png",
  1995,
  paradigms.objectedOriented,
  complexity.medium
);
let pythonCard = new Card(
  "Python",
  "https://i.imgur.com/rFlhiR0.png",
  1991,
  paradigms.multi,
  complexity.low
);
let lispCard = new Card(
  "Lisp",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Lisp_logo.svg/1024px-Lisp_logo.svg.png",
  1958,
  paradigms.functional,
  complexity.medium
);
let cppCard = new Card(
  "C++",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
  1985,
  paradigms.objectedOriented,
  complexity.high
);
let kotlinCard = new Card(
  "Kotlin",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kotlin_Icon.svg/2000px-Kotlin_Icon.svg.png",
  2011,
  paradigms.objectedOriented,
  complexity.medium
);
let rustCard = new Card(
  "Rust",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1200px-Rust_programming_language_black_logo.svg.png",
  2010,
  paradigms.multi,
  complexity.high
);
let cards = [
  cCard,
  haskellCard,
  javaCard,
  pythonCard,
  lispCard,
  cppCard,
  kotlinCard,
  rustCard
];

let points = { player: 0, computer: 0 };
let gameCards = { player: undefined, computer: undefined };
updateScore(points.player, points.computer);
