# DESIGN.md — デザインシステム

## コンセプト

> 「静寂の中に、美しさを。」

allée KAKEGAWA を参照元に、**余白・タイポグラフィ・素材感**で高級感を表現する。  
装飾を足すのではなく、引き算で洗練させる方向性。

---

## カラーパレット

| 変数 | 値 | 用途 |
|------|----|------|
| `--cream` | `#F8F5F0` | ベース背景。暖かみのあるオフホワイト |
| `--cream-dark` | `#EDE8E0` | ギャラリー画像のプレースホルダー |
| `--charcoal` | `#1A1A1A` | テキスト・ACCESS背景 |
| `--charcoal-mid` | `#2E2E2E` | フッター背景 |
| `--gold` | `#C9A96E` | アクセント。ラベル・ライン・ホバー |
| `--gold-light` | `#E2C99A` | ヒーロー eyebrow など薄用途 |
| `--muted` | `#7A7672` | 補足テキスト・キャプション |
| `--white` | `#FFFFFF` | メニューセクション背景 |

**原則：** ゴールドは「差し色」として使う。面積が広くなると安っぽくなる。

---

## タイポグラフィ

| 変数 | フォント | 用途 |
|------|----------|------|
| `--font-display` | Cormorant Garamond | 見出し・ロゴ・メニュー名 |
| `--font-body` | Noto Sans JP | 本文・ラベル・ナビ |

### クラス別仕様

| クラス | サイズ | 特記事項 |
|--------|--------|----------|
| `.label` | 0.62rem | 全大文字・letter-spacing 0.28em・ゴールド・左に金線 |
| `.section-title` | `clamp(2.6rem, 4.5vw, 3.8rem)` | `em` タグで italicに |
| `.body-text` | 0.875rem | line-height 2.1・letter-spacing 0.06em |
| `.body-text-en` | 0.75rem | italic・上罫線で区切り |
| `.hero-title` | `clamp(6rem, 17vw, 16rem)` | letter-spacing 0.16em |

---

## スペーシング

- セクション上下パディング：デスクトップ `130〜150px`、タブレット `100px`、モバイル `80px`
- 左右パディング：デスクトップ `48px`、タブレット `32px`、モバイル `24px`
- `max-width`：コンテンツ列 `1280px`、ギャラリー `1400px`

---

## アニメーション

### ヒーロー（ページ読み込み時）

順番にフェードアップで登場。CSS `animation` で実装。

| 要素 | 遅延 |
|------|------|
| eyebrow | 0.6s |
| タイトル | 0.9s |
| サブコピー | 1.3s |
| SCROLL | 2.0s |
| ケン・バーンズ（背景縮小） | 0s・10s かけて scale 1.08 → 1.0 |

### スクロールトリガー（`.fade-in`）

`IntersectionObserver` で `threshold: 0.12` に達したとき `.visible` クラスを付与。  
`opacity: 0 + translateY(36px)` → `opacity: 1 + translateY(0)`。  
`delay-1`（0.18s）・`delay-2`（0.36s）で段差をつける。

### ホバー

- 画像：`transform: scale(1.04〜1.06)`（0.7〜0.9s）
- ナビリンク：下線が左から伸びる（0.35s）
- SNSアイコン：`--muted` → `--gold`（0.45s）

### イージング

`--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` を基本とする。  
自然に減速する動き。`ease` や `linear` は最小限に。

---

## レイアウトパターン

### 2カラム（Concept / Access）

```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 90〜100px;
```

### 3カラム（Menu）

```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 48px;
```

### 非対称ギャラリー

```
左カラム (1.2fr) : 右カラム (1fr)
┌──────────────┬──────────┐
│              │ 小画像   │ row 1
│  大画像      │──────────│
│ (row 1/4)    │ 小画像   │ row 2
│              │──────────│
│              │ 小画像   │ row 3
└──────────────┴──────────┘
height: 700px; grid-template-rows: repeat(3, 1fr)
```

---

## 画像方針

- すべて `object-fit: cover` で切り抜き
- `loading="lazy"` を必ず付ける（ヒーロー背景を除く）
- Unsplash プレースホルダーは `?w=` と `&q=85` でリサイズ・品質指定済み
- ヒーロー背景のみ CSS `background-image` で指定（`will-change: transform` で最適化済み）

---

## アクセシビリティ

- セクション見出しに `aria-labelledby` を設定
- SVG アイコンに `aria-hidden="true"` と `aria-label`（親 `<a>` 側）
- `focus-visible` 時はゴールドの `outline: 2px` を表示
- ナビゲーションのハンバーガーボタンは `aria-expanded` を JS で更新
