/*
  メインプロセス
*/

// 各種モジュールの読み込み
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

app.once("ready", () => {
  // ウインドウの描画
  const window = new BrowserWindow({
    // ウインドウの幅
    width: 500,

    // ウインドウの高さ
    height: 400,

    // タイトルバーのスタイルを指定する
    titleBarStyle: "hiddenInset",

    // 背景色を指定できる
    backgroundColor: "#111",
    
    // readyになるまでウインドウを表示しない
    show: false
  });

  window.loadFile("../index.html");

  window.once("ready-to-show", () => {
    window.show();
  });
});
