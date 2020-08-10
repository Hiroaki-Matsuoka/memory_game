'use strice'
{
  var pairs = 0;
  var cards = [];
  var gameRunning = false;

  var flipCount = 0;
  var firstCard = null;
  var secondCard = null;

  var startTime;
  var elapsedTime = 0;
  var isRunning = false;
  var correctCount = 0;
  var timeoutId;
  var point = 0;
  //　連続して正解した場合の加算と減算
  var doubleScore = 0;


    // -----------初期化----------
    // カードの枚数に合わせて数字をランダムにcreateCard()へ引数を渡す
    function init(getMode) {
    pairs = getMode;
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
      document.getElementById('score').textContent = ((Date.now() - startTime + elapsedTime) / 1000).toFixed(2);
      timeoutId = setTimeout( function() {
        runTimer();
      }, 10);
    }


    var start = document.getElementById('start');
    var stop = document.getElementById('stop');

    start.addEventListener('click', () => {
      startTime = Date.now();
      runTimer();
    });

    stop.addEventListener('click', () => {
      clearTimeout(timeoutId);
      elapsedTime += Date.now() - startTime;
    });
    // ----------タイマーセット関数終了----------------

  init();

  // -------------MODE SELECT---------------
  var mode = document.getElementById('mode');
  var modal = document.getElementById('modal');
  var mask = document.getElementById('mask');
  var close = document.getElementById('close');

  var easy = document.getElementById('easy');
  var normal = document.getElementById('normal');
  var hard = document.getElementById('hard');

  var modalHidden = () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  }

  var modalOpen = () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  }

  mode.addEventListener('click', () => {
    modalOpen();
  });

  close.addEventListener('click', () => {
    modalHidden();
  });

  mask.addEventListener('click', () => {
    modalHidden();
  });

  easy.addEventListener('click', () => {
    if(gameRunning === true) {
      return;
    } else {
      init(4);
      modalHidden();
      gameRunning = true;
    }
  });

  normal.addEventListener('click', () => {
    if(gameRunning === true) {
      return;
    } else {
      init(8);
      modalHidden();
      gameRunning = true;
    }
  });

  hard.addEventListener('click', () => {
    if(gameRunning === true) {
      return;
    } else {
      init(12);
      modalHidden();
      gameRunning = true;
    }
  });
// ----------------MODE SELECT----------------

// ----------------STOPボタン-------------------


}
