# 素因数分解ゲーム  Bot

## 環境構築
```bash
$ git clone https://github.com/kokoa0429/soinnsu-bunkai-bot
$ npm i
$ node index.js
```

## 使い方
```
 !i help : ヘルプを表示します。
 !i new :  新しいゲームを始めます。
 !i new [number] : [number]以下のランダムな自然数で新しいゲームを始めます。
 !i [number] : 素因数分解します。間違っていた場合何も返答されません。
 [number] : !i [number] の短縮コマンドです。動作は変わりません。
```

## サンプル
```
因数分解Bot: 5247を素因数分解してください
User1: 3
因数分解Bot: 3で割れました。(ここあ) 商:1749
User2: 3
因数分解Bot: 3で割れました。(ns2091) 商:583
User1: 583
因数分解Bot: 素数じゃないようです。。。
User2: 11
因数分解Bot: 11で割れました。(ns2091) 商:53
ここあ: 53
因数分解Bot: 53で割れました。(ここあ) 商:1
因数分解Bot: ゲームクリアー わーい
5247 = 3 * 3 * 11 * 53
User1:2pt 
User2:2pt
```