# 神経衰弱

JavaScriptの基礎学習として神経衰弱を作成しました。

## 概要

JavaScriptのみで作成

1.elem.className()によってスタイルを外部化することでコード量が増えた時の管理がしやすくなる。
　style.で記述してもよいがなるべく外部化する方が良い。

2.spliceメソッド
　splice(3, 2, 'matsuoka')の場合引数1の位置から開始して引数2の要素数を削除して引数3に該当する要素に置き換える。
　引数2を0にした場合は引数3を挿入するという意味となる。
　つまり今回の場合ではランダムに決められた引数1から要素を1つ0に置き換えるということ。p134

 最後の[0]はどういうことか？最初の要素を取り出すためとあるが、毎回配列に０が追加されている訳でもなさそうである。

3.while
 while(条件式){}の条件を満たす間以下の処理を繰り返す。

 4.最初はcardを振り分けるためのcards配列に挿入しているだけ。
 　1周目で2枚追加してるのでwhile()の条件式が2回実行(card.lengthなので)されたのちにもう一度
 　forが実行されてもう2枚追加されてwhile以下も2回実行される。
 　3回目はpairsを2に設定しておりfor側がループを抜けるのでwhileもループを抜ける事になる。

 　※for文の条件を抜けきってからwhile以下が実行されるので今回の場合はちゃんと4枚生成された上で
 　ランダムに数字が配置される。
 　while(cards.length)はcardsの要素数の回数だけ実行される。

5.flipCard()関数の条件分岐に関して
　演算子　flipCard % 2 === 1で余りが1になるのはJSの場合このままでは小数にならず
　割り切れないので1が余る。

6.クリックしたカードの正誤判定に関して、.className = 'card';でopenが解除されるということは、
　classNameは追加の意味ではなく上書きの意味となる？
　恐らく古い記述方法なので現在であればclassListの方が便利かも？

7.イベントリスナーのtransitionendはCSSのtransitionが完了した時に発生するイベント。


実装したいイベント
得点の加算 finished!
連続で当てるとポイント倍増 finished!
ミスすると減点 finished!
時間内に終わらなければゲームオーバー(イージー、ノーマル、ハードモード)
枚数もこちらで決める
ポイントを溜めてご褒美と交換
一時停止機能
