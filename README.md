# LibreTV - 免費線上影片搜尋與觀看平台

<div align="center">
  <img src="image/logo.png" alt="LibreTV Logo" width="120">
  <br>
  <p><strong>自由觀影，暢享精彩</strong></p>
</div>

## 📺 專案簡介

LibreTV 是一個輕量級、免費的線上影片搜尋與觀看平台，提供來自多個影片來源的內容搜尋與播放服務。無需註冊，即開即用，支援多種裝置存取。專案結合了前端技術和後端代理功能，可部署在支援伺服器端功能的各類網站代管服務上。**專案入口**： [libretv.is-an.org](https://libretv.is-an.org)

本專案基於 [bestK/tv](https://github.com/bestK/tv) 進行重構與增強。

<details>
  <summary>點擊查看專案截圖</summary>
  <img src="https://github.com/user-attachments/assets/df485345-e83b-4564-adf7-0680be92d3c7" alt="專案截圖" style="max-width:600px">
</details>

## 🚀 快速部署

選擇以下任一平台，點擊一鍵部署按鈕，即可快速建立自己的 LibreTV 實例：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLibreSpark%2FLibreTV)  
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/LibreSpark/LibreTV)  
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/LibreSpark/LibreTV)

## 🚨 重要聲明

- 本專案僅供學習和個人使用，為避免版權糾紛，必須設定 `PASSWORD` 環境變數。
- 請勿將部署的實例用於商業用途或公開服務。
- 如因公開分享導致的任何法律問題，使用者需自行承擔責任。
- 專案開發者不對使用者的使用行為承擔任何法律責任。

## ⚠️ 同步與升級

Pull Bot 會反覆觸發無效的 PR 和垃圾郵件，嚴重干擾專案維護。作者可能會直接封鎖所有由 Pull Bot 自動發起同步請求的儲存庫擁有者。

**建議做法：**

建議在 fork 的儲存庫中啟用本儲存庫內建的 GitHub Actions 自動同步功能（見 `.github/workflows/sync.yml`）。 

如需手動同步主儲存庫的更新，也可以使用 GitHub 官方的 [Sync fork](https://docs.github.com/cn/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) 功能。

對於更新後可能會出現的錯誤和異常，在設定中備份設定後，請先清除頁面 Cookie，然後按下 Ctrl + F5 重新整理頁面。再次造訪網頁檢查是否解決問題。


## 📋 詳細部署指南

### Cloudflare Pages

1. Fork 或 Clone 本儲存庫到您的 GitHub 帳戶
2. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)，進入 Pages 服務
3. 點擊「建立專案」，連接您的 GitHub 儲存庫
4. 使用以下設定：
   - 構建指令 (Build command)：留空（無需構建）
   - 輸出目錄 (Build output directory)：留空（預設為根目錄）
5. **⚠️ 重要：在「設定」 > 「環境變數」中新增 `PASSWORD` 變數（必須設定）**
6. 點擊「儲存並部署」

### Vercel

1. Fork 或 Clone 本儲存庫到您的 GitHub/GitLab 帳戶
2. 登入 [Vercel](https://vercel.com/)，點擊「New Project」
3. 匯入您的儲存庫，使用預設設定
4. **⚠️ 重要：在「Settings」 > 「Environment Variables」中新增 `PASSWORD` 變數（必須設定）**
5. 點擊「Deploy」


### Docker
```bash
docker run -d \
  --name libretv \
  --restart unless-stopped \
  -p 8899:8080 \
  -e PASSWORD=your_password \
  bestzwei/libretv:latest
```

### Docker Compose

`docker-compose.yml` 檔案：

```yaml
services:
  libretv:
    image: bestzwei/libretv:latest
    container_name: libretv
    ports:
      - "8899:8080" # 將內部 8080 連接埠對應到主機的 8899 連接埠
    environment:
      - PASSWORD=${PASSWORD:-111111} # 可將 111111 修改為您想要的密碼，預設為 your_password
    restart: unless-stopped
```
啟動 LibreTV：

```bash
docker compose up -d
```
造訪 `http://localhost:8899` 即可使用。

### 本機開發環境

專案包含後端代理功能，需要支援伺服器端功能的環境：

```bash
# 首先，透過複製範例來設定 .env 檔案（選用）
cp .env.example .env

# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev
```

造訪 `http://localhost:8080` 即可使用（連接埠可在 .env 檔案中透過 `PORT` 變數修改）。

> ⚠️ 注意：使用簡單靜態伺服器（如 `python -m http.server` 或 `npx http-server`）時，影片代理功能將無法使用，影片無法正常播放。完整功能測試請使用 Node.js 開發伺服器。

## 🔧 自訂設定

### 密碼保護

**重要提示**: 為確保安全，所有部署都必須設定 `PASSWORD` 環境變數，否則使用者將看到設定密碼的提示。


### API 相容性

LibreTV 支援標準的蘋果 CMS V10 API 格式。新增自訂 API 時需遵循以下格式：
- 搜尋介面: `https://example.com/api.php/provide/vod/?ac=videolist&wd=關鍵字`
- 詳情介面: `https://example.com/api.php/provide/vod/?ac=detail&ids=影片ID`

**新增 CMS 來源**:
1. 在設定面板中選擇「自訂介面」
2. 介面網址: `https://example.com/api.php/provide/vod`

## ⌨️ 鍵盤快捷鍵

播放器支援以下鍵盤快捷鍵：

- **空白鍵**: 播放 / 暫停
- **左右方向鍵**: 快退 / 快轉
- **上下方向鍵**: 音量增加 / 減小
- **M 鍵**: 靜音 / 取消靜音
- **F 鍵**: 全螢幕 / 退出全螢幕
- **Esc 鍵**: 退出全螢幕

## 🛠️ 技術堆疊

- HTML5 + CSS3 + JavaScript (ES6+)
- Tailwind CSS
- HLS.js 用於 HLS 串流處理
- DPlayer 影片播放器核心
- Cloudflare/Vercel/Netlify Serverless Functions
- 伺服器端 HLS 代理和處理技術
- localStorage 本機儲存

## ⚠️ 免責聲明

LibreTV 僅作為影片搜尋工具，不儲存、上傳或散佈任何影片內容。所有影片均來自第三方 API 介面提供的搜尋結果。如有侵權內容，請聯繫相應的內容提供方。

本專案開發者不對使用本專案產生的任何後果負責。使用本專案時，您必須遵守當地的法律法規。

## 🤝 衍生專案

它們提供了更多豐富的自訂功能，歡迎體驗～

- **[MoonTV](https://github.com/senshinya/MoonTV)**  
- **[OrionTV](https://github.com/zimplexing/OrionTV)**  
