# 概要

ウェブカメラの映像を WebSocket でクライアントに送信する。
カメラの入力をjpegとして保存し、base64エンコードした画像データをクライアントに送ります。
かなり原始的なので配信としてのクオリティは低め。

# 使い方

1. パッケージをインストール

```bash
npm ci
```

2. サーバーを立てる

```bash
npx ts-node src/video/index.ts
```

3. クライアントを起動する

- ブラウザで`http://localhost:8080`を開く