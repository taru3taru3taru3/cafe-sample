# CLAUDE.md — café-sample

## プロジェクト概要

掛川の高級カフェ（allée KAKEGAWA 参考）のランディングページ。  
オンラインショップなし。目的は**来店促進**のみ。

## ファイル構成

```
cafe-sample/
├── index.html       ── ページ全体（単一ファイル）
├── css/style.css    ── 全スタイル（CSS変数 → セクション順に記述）
└── js/main.js       ── スクロール挙動・アニメーション・ハンバーガー
```

フレームワーク・ビルドツール不使用。`index.html` をブラウザで直接開いて確認する。

## セクション構成（HTML上の順序）

| id | 内容 |
|----|------|
| `#nav` | 固定ヘッダー。スクロールで透過 → クリーム白に変化 |
| `#hero` | 100svh。ケン・バーンズ効果。ページ読み込み時アニメーション |
| `#concept` | 2カラム（テキスト左・写真右） |
| `#menu` | 3カラムグリッド。`article.menu-item` を繰り返す |
| `#gallery` | 非対称グリッド（左1枚大＋右3枚小）。`.gallery-main` が `grid-row: 1/4` |
| `#access` | 暗背景。左：店舗情報 `dl.access-list`、右：地図 `.access-map`（`align-self: stretch`） |
| `#footer` | SNSアイコン（インラインSVG） |
| `#progress-bar` | スクロール進捗バー（ゴールド・2px・画面最上部固定） |

## CSS の約束事

- **変数はすべて `:root` に集約**。色・フォント・イージングを直接書かない
- セクションごとにコメントブロック `/* ====... */` で区切る
- レスポンシブは末尾に `@media (max-width: 960px)` と `@media (max-width: 600px)` の2段階
- `fade-in` クラスは JS の IntersectionObserver で `.visible` を付与する仕組み。CSS アニメーションと混在させない

## 画像

現在はすべて Unsplash のプレースホルダー URL。  
実際の写真に差し替える際は `src` 属性のみ変更すれば良い。`alt` テキストも合わせて更新する。

## 差し替えが必要な箇所

- 店舗名 `ÉPURE` → 実際の店名
- 住所・電話番号・営業時間（`#access` セクション）
- Google マップの `src` URL（コメントあり）
- フッターの SNS リンク `href="#"`
- コピーライト年度
- ヒーロー・コンセプトなど各画像の `src`
