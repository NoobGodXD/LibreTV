// 全域常數設定
const PROXY_URL = '/proxy/';    // 適用於 Cloudflare, Netlify (帶重寫), Vercel (帶重寫)
// const HOPLAYER_URL = 'https://hoplayer.com/index.html';
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

// 密碼保護設定
// 注意：PASSWORD 環境變數是必需的，所有部署都必須設定密碼以確保安全
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',  // 儲存驗證狀態的鍵名
    verificationTTL: 90 * 24 * 60 * 60 * 1000  // 驗證有效期（90 天，約 3 個月）
};

// 網站資訊設定
const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv.is-an.org',
    description: '免費線上影片搜尋與觀看平台',
    logo: 'image/logo.png',
    version: '1.0.3'
};

// API 站點設定
const API_SITES = {
    dyttzy: {
        api: 'http://caiji.dyttzyapi.com/api.php/provide/vod',
        name: '電影天堂資源',
        detail: 'http://caiji.dyttzyapi.com', 
    },
    ruyi: {
        api: 'https://cj.rycjapi.com/api.php/provide/vod',
        name: '如意資源',
    },
    bfzy: {
        api: 'https://bfzyapi.com/api.php/provide/vod',
        name: '暴風資源',
    },
    tyyszy: {
        api: 'https://tyyszy.com/api.php/provide/vod',
        name: '天涯資源',
    },
    xiaomaomi: {
        api: 'https://zy.xmm.hk/api.php/provide/vod',
        name: '小貓咪資源',
    },
    ffzy: {
        api: 'http://ffzy5.tv/api.php/provide/vod',
        name: '非凡影視',
        detail: 'http://ffzy5.tv', 
    },
    heimuer: {
        api: 'https://json.heimuer.xyz/api.php/provide/vod',
        name: '黑木耳',
        detail: 'https://heimuer.tv', 
    },
    zy360: {
        api: 'https://360zy.com/api.php/provide/vod',
        name: '360資源',
    },
    iqiyi: {
        api: 'https://www.iqiyizyapi.com/api.php/provide/vod',
        name: 'iqiyi資源',
    },
    wolong: {
        api: 'https://wolongzyw.com/api.php/provide/vod',
        name: '臥龍資源',
    }, 
    hwba: {
        api: 'https://cjhwba.com/api.php/provide/vod',
        name: '華為吧資源',
    },
    jisu: {
        api: 'https://jszyapi.com/api.php/provide/vod',
        name: '極速資源',
        detail: 'https://jszyapi.com', 
    },
    dbzy: {
        api: 'https://dbzy.tv/api.php/provide/vod',
        name: '豆瓣資源',
    },
    mozhua: {
        api: 'https://mozhuazy.com/api.php/provide/vod',
        name: '魔爪資源',
    },
    mdzy: {
        api: 'https://www.mdzyapi.com/api.php/provide/vod',
        name: '魔都資源',
    },
    zuid: {
        api: 'https://api.zuidapi.com/api.php/provide/vod',
        name: '最大資源'
    },
    yinghua: {
        api: 'https://m3u8.apiyhzy.com/api.php/provide/vod',
        name: '櫻花資源'
    },
    baidu: {
        api: 'https://api.apibdzy.com/api.php/provide/vod',
        name: '百度雲資源'
    },
    wujin: {
        api: 'https://api.wujinapi.me/api.php/provide/vod',
        name: '無盡資源'
    },
    wwzy: {
        api: 'https://wwzy.tv/api.php/provide/vod',
        name: '旺旺短劇'
    },
    ikun: {
        api: 'https://ikunzyapi.com/api.php/provide/vod',
        name: 'iKun資源'
    },
    lzi: {
        api: 'https://cj.lziapi.com/api.php/provide/vod/',
        name: '量子資源站'
    },
    testSource: {
        api: 'https://www.example.com/api.php/provide/vod',
        name: '空內容測試來源',
        adult: true
    }
    //ARCHIVE https://telegra.ph/APIs-08-12
};

// 定義合併方法
function extendAPISites(newSites) {
    Object.assign(API_SITES, newSites);
}

// 暴露到全域
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;


// 新增聚合搜尋的設定選項
const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,             // 是否啟用聚合搜尋
    timeout: 8000,            // 單一來源超時時間（毫秒）
    maxResults: 10000,          // 最大結果數量
    parallelRequests: true,   // 是否並行請求所有來源
    showSourceBadges: true    // 是否顯示來源徽章
};

// 抽象 API 請求設定
const API_CONFIG = {
    search: {
        // 只拼接參數部分，不再包含 /api.php/provide/vod/
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 50, // 最大獲取頁數
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        // 只拼接參數部分
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    }
};

// 最佳化後的正規表示式模式
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;

// 新增自訂播放器 URL
const CUSTOM_PLAYER_URL = 'player.html'; // 使用相對路徑引用本機 player.html

// 增加影片播放相關設定
const PLAYER_CONFIG = {
    autoplay: true,
    allowFullscreen: true,
    width: '100%',
    height: '600',
    timeout: 15000,  // 播放器載入超時時間
    filterAds: true,  // 是否啟用廣告過濾
    autoPlayNext: true,  // 預設啟用自動連播功能
    adFilteringEnabled: true, // 預設開啟分片廣告過濾
    adFilteringStorage: 'adFilteringEnabled' // 儲存廣告過濾設定的鍵名
};

// 增加錯誤訊息在地化
const ERROR_MESSAGES = {
    NETWORK_ERROR: '網路連線錯誤，請檢查網路設定',
    TIMEOUT_ERROR: '請求超時，伺服器回應時間過長',
    API_ERROR: 'API 介面返回錯誤，請嘗試更換資料來源',
    PLAYER_ERROR: '播放器載入失敗，請嘗試其他影片來源',
    UNKNOWN_ERROR: '發生未知錯誤，請重新整理頁面重試'
};

// 新增進一步安全設定
const SECURITY_CONFIG = {
    enableXSSProtection: true,  // 是否啟用 XSS 保護
    sanitizeUrls: true,         // 是否清理 URL
    maxQueryLength: 100,        // 最大搜尋長度
    // allowedApiDomains 不再需要，因為所有請求都透過內部代理
};

// 新增多個自訂 API 來源的設定
const CUSTOM_API_CONFIG = {
    separator: ',',            // 分隔符號
    maxSources: 5,             // 最大允許的自訂來源數量
    testTimeout: 5000,         // 測試超時時間(毫秒)
    namePrefix: 'Custom-',     // 自訂來源名稱前綴
    validateUrl: true,         // 驗證 URL 格式
    cacheResults: true,        // 快取測試結果
    cacheExpiry: 5184000000,  // 快取過期時間(2個月)
    adultPropName: 'isAdult' // 用於標記成人內容的屬性名稱
};

// 隱藏內建黃色採集站 API 的變數
const HIDE_BUILTIN_ADULT_APIS = false;