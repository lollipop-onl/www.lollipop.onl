(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{185:function(t,n){const e=[[{id:"abcd1234",title:"フロントエンドエンジニアのためのGitHub Actionsレシピ",author:"ロリポップランチャー",published:"技術書典8 Day2",cover:"https://placehold.jp/320x320.png",price:1e3,flags:{dlc:!0,ebook:!0,book:!0},ebookUrl:"https://pixiv.co.jp",lead:"フロントエンドの開発には、自動化すると効率が良くなるタスクがたくさん存在します。\n本書ではいくつかのタスクをGitHub Actionsで自動化するワークフローのレシピをご紹介します。\n",body:"目次：\n第１章　GitHub Actionsをはじめよう\n　GitHub Actionsの基本的な機能や料金、使い方をご紹介します。\n\n第２章　ESLintのチェックを自動化しよう\n　ESLintによるチェックをワークフローで自動化します。\n　更に、自動修正された差分をブランチにPushする機能の設定までをご紹介します。\n\n第３章　GitHub Pagesへのデプロイを自動化しよう\n　GitHub Pagesへのデプロイを自動化するワークフローをご紹介します。\n\n第４章　Pull RequestのプレビューをS3へデプロイしよう\n　各Pull Requestの内容をS3へ個別にデプロイしてそれぞれプレビューできる機能を作成します。\n　AWS S3の基本的な使い方からGitHubコンテキストまで幅広くご紹介します。\n\n第５章　TestCafeのE2Eテストを自動化しよう\n　E2Eツール、TestCafeを使ったE2Eテスト（End to Endテスト）を自動化するワークフローを作成します。\n　また、テストに失敗した際のスクリーンショットをアーティファクトに登録する機能もご紹介します。\n\n付録Ａ　ワークフローファイル\n　本編で紹介するワークフローファイルの他に、紹介した内容を応用したワークフローファイルもご紹介します。\n\n付録Ｂ　GitHub Actions用語集\n　GitHub Actionsのドキュメントに記載されている専門用語をまとめました。\n\n付録Ｃ　コンテキストと環境変数\n　GitHub Actionsが提供するコンテキストと式、環境変数の内容を実際の出力例と併せてまとめました。\n"},{id:"xyz000",title:"Stylistic ESLint Rules",author:"ロリポップランチャー",published:"技術書典8 Day2 (2020/03/01)",cover:"https://placehold.jp/320x320.png",price:1e3,flags:{dlc:!0,ebook:!0,book:!1},ebookUrl:"https://pixiv.co.jp",lead:"ESLintルールの中から、コードの「スタイル」をチェックする自動修正可能なルールをまとめました。\n",body:"ESLintルールの中から、コードの「スタイル」をチェックする自動修正可能なルールをまとめた本。\n\n自作ルールセットでPrettierを超えてゆけ。\n\n★普通に落とす可能性アリ\n"}]];t.exports=e.length<=1?e[0]:e},241:function(t,n,e){"use strict";e.r(n);e(209);var o=e(176),c=e(182),r=e(178),l=e(177),d=e(179),f=e(18),h=e(175),j=e(185),k=e.n(j),E=function(t,n,e,desc){var o,c=arguments.length,r=c<3?n:null===desc?desc=Object.getOwnPropertyDescriptor(n,e):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,n,e,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(r=(c<3?o(r):c>3?o(n,e,r):o(n,e))||r);return c>3&&r&&Object.defineProperty(n,e,r),r},v=function(t){function n(){return Object(o.a)(this,n),Object(r.a)(this,Object(l.a)(n).apply(this,arguments))}return Object(d.a)(n,t),Object(c.a)(n,[{key:"validate",value:function(t){var n=t.route.params.bookId;return k.a.some((function(t){return t.id===n}))}},{key:"book",get:function(){var t=this.$route.params.bookId;return k.a.find((function(n){return n.id===t}))}}]),n}(h.Vue),y=v=E([h.Component],v),G=e(19),component=Object(G.a)(y,(function(){var t=this.$createElement;return(this._self._c||t)("p",[this._v(this._s(this.book.title))])}),[],!1,null,"7d4ff748",null);n.default=component.exports}}]);