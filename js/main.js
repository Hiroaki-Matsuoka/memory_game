'use strice'
{

  var pairs = 4;
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

    // -----------初期化----------
    // カードの枚数に合わせて数字をランダムにcreateCard()へ引数を渡す
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
    //--------初期化ここまで---------

    // ------カードの生成--------　
  function createCard(num) {
    var container;
    var card;
    var inner;
    inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>';

    card = document.createElement('div');
    card.innerHTML = inner;
    card.className = 'card';

    // カードをクリックしたらゲームスタート タイマー起動
    // ゲームが開始していたらflipCard()を呼び出すだけ
    // 
    card.addEventListener('click', function() {
      // thisはクリックした要素
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
  // --------カードの生成ここまで---------

    // --------カードをめくる処理--------
    // cardはクリックしたカード
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
  // --------カードをめくる処理終了-----------

  // --------カードがペアかどうかのチェック----------
    function check() {
      if (
        firstCard.children[0].textContent !==
        secondCard.children[0].textContent
      ) {
        firstCard.className = 'card';
        secondCard.className = 'card';
        point -= 50;
        doubleScore = 0;
        console.log(doubleScore);
        document.getElementById('point').textContent = point;
      } else {
        correctCount++;
        switch (doubleScore) {
          case 1 :
            point += 100 * 2;
            break;
          case 2 :
            point += 200 * 2;
            break;
          case 3 :
            point += 400 * 2;
            break;
          default :
          point += 100;
          break;
        }
        doubleScore++;
        console.log(doubleScore);
        document.getElementById('point').textContent = point;
        if (correctCount === pairs) {
          clearTimeout(timeoutId);
        }
      }
      secondCard.removeEventListener('transitionend', check);
      firstCard = null;
      secondCard = null;
    }
   
    // ---------カードがペアかどうかのチェック終了-------------

    // ---------タイマーセット関数----------------
    function runTimer() {
      document.getElementById('score').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
      timeoutId = setTimeout( function() {
        runTimer();
      }, 10);
    }
    // ----------タイマーセット関数終了----------------

  init();
}
