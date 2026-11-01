import { sha256 } from '../js/sha256.js';

export async function onRequest(context) {
  const { request, env, next } = context;
  const response = await next();
  const contentType = response.headers.get("content-type") || "";
  
  if (contentType.includes("text/html")) {
    let html = await response.text();
    
    // 處理普通密碼
    const password = env.PASSWORD || "";
    let passwordHash = "";
    if (password) {
      passwordHash = await sha256(password);
    }
    html = html.replace('window.__ENV__.PASSWORD = "{{PASSWORD}}";', 
      `window.__ENV__.PASSWORD = "${passwordHash}";`);

    // 片名對照用的 TMDB 金鑰（可選；只允許字母、數字、-、_、.，避免被注入）
    const tmdbKey = String(env.TMDB_API_KEY || "").replace(/[^A-Za-z0-9._-]/g, "");
    html = html.replace('window.__ENV__.TMDB_API_KEY = "{{TMDB_API_KEY}}";',
      `window.__ENV__.TMDB_API_KEY = "${tmdbKey}";`);
    
    return new Response(html, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    });
  }
  
  return response;
}