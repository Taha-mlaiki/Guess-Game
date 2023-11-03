let startbtn = document.querySelector(".button");
let start = document.querySelector(".start");

let cards = document.querySelectorAll(".card");
let cardsArr = Array.from(cards);
let container = document.querySelector(".container");

// let prom = prompt("what is your name");
startbtn.onclick = function () {
  let prom = prompt("what is your name");
  let nAme = document.querySelector("header .name");
  if (prom == null || prom == "") {
    nAme.innerHTML = "unknown";
  } else {
    nAme.innerHTML = prom;
  }
  start.remove();
  shuffleCards();
  flipSecond();
};

function flipSecond() {
  let flipedTime = 3;
  let startAudio = document.querySelector(".startAudio");
  startAudio.play();
  let count = setInterval(() => {
    flipedTime--;
    cardsArr.forEach((e) => {
      e.classList.add("flipped");
    });
    if (flipedTime <= 0) {
      cardsArr.forEach((e) => {
        e.classList.remove("flipped");
        clearInterval(count);
      });
    }
  }, 1000);
}

function shuffleCards() {
  for (let i = 0; i < cardsArr.length; i++) {
    let ran = Math.floor(Math.random() * cardsArr.length);
    cardsArr[i].style.order = ran;
  }
}

let allFlipedCards = [];

cardsArr.forEach((e) => {
  e.addEventListener("click", function () {
    e.classList.toggle("flipped");
    isFlipped(e);
  });
});

function isFlipped(card) {
  if (card.classList.contains("flipped")) {
    allFlipedCards.push(card);
  }
  if (allFlipedCards.length === 2) {
    stopClicking();
    checkCards(allFlipedCards[0], allFlipedCards[1]);
    allFlipedCards = [];
  }
}
function stopClicking() {
  container.classList.add("no-clicking");
  setTimeout(() => {
    container.classList.remove("no-clicking");
  }, 1000);
}

let tries = document.querySelector(".tries");
function checkCards(firstCard, secondCard) {
  if (firstCard.dataset.technologie == secondCard.dataset.technologie) {
    let correct = document.querySelector(".correct");
    let correctcards = 0;
    correctcards++;
    correct.play();
    firstCard.classList.add("done");
    secondCard.classList.add("done");
    if (correctcards == 10) {
      let good = document.querySelector(".winner");
      good.style.display = "block";
    }
  } else {
    let wrong = document.querySelector(".wrong");
    wrong.play();
    firstCard.classList.add("done");
    secondCard.classList.add("done");
    tries.innerHTML--;
    if (tries.innerHTML == "0") {
      let looser = document.querySelector(".loser");
      looser.style.display = "block";
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }
}
