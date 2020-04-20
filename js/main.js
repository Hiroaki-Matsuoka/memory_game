'use strice'
{

  var pairs = 2;
  var cards = [];

  var flipCount = 0;
  var firstCard = null;
  var secondCard = null;

  var startTime;
  var isRunning = false;
  var correctCount = 0;
  var timeoutId;
  var point = 0;
  //　連続して正解した場合の加算と減算
  var doubleScore = 0;

    function init() {
    var i;
    var card;
    for (i = 1; i <= pairs; i++) {
      cards.push(createCard(i));
      cards.push(createCard(i));
    }
    while (cards.length) {
      card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
      console.log(cards);
      document.getElementById('stage').appendChild(card);
    }
  }

  function createCard(num) {
    var container;
    var card;
    var inner;
    inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>';

    card = document.createElement('div');
    card.innerHTML = inner;
    card.className = 'card';
    card.addEventListener('click', function() {
      flipCard(this);
      if (isRunning === true) {
        return;
      }
      isRunning = true;
      startTime = Date.now();
      runTimer();
      document.getElementById('restart').className = '';
    });
    container = document.createElement('div');
    container.className = 'card-container';
    container.appendChild(card);
    return container;
  }


  function flipCard(card) {
    if (firstCard !== null && secondCard !== null) {
      return;
    }
    if (card.className.indexOf('open') !== -1) {
      return;
    }
    card.className = 'card open';
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      secondCard.addEventListener('transitionend', check);
    }
  }

    function check() {
      if (
        firstCard.children[0].textContent !==
        secondCard.children[0].textContent
      ) {
        firstCard.className = 'card';
        secondCard.className = 'card';
        point -= 50;
        document.getElementById('point').textContent = point;
      } else {
        correctCount++;
        point += 100;
        document.getElementById('point').textContent = point;
        if (correctCount === pairs) {
          clearTimeout(timeoutId);
        }
      }
      secondCard.removeEventListener('transitionend', check);
      firstCard = null;
      secondCard = null;
    }

    function runTimer() {
      document.getElementById('score').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
      timeoutId = setTimeout( function() {
        runTimer();
      }, 10);
    }

  init();
}
