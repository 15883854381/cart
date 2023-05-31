export const serverUrl = '' // 前端页面的地址（如果是映射的就写外网地址）
export const wwwUrl = process.env.NODE_ENV === "development"?'http://e.199909.xyz':'http://g.199909.xyz'// 公众号的外网地址 授权后跳转的页面
// 正式账号
export const appid = process.env.NODE_ENV === "development"?'wx1db4af9dd7f6371f':'wxdcf354de383af42c' // 公众号的appid
export const appsecret = process.env.NODE_ENV === "development"?'9aa5ad7b6b2f6d221a83769ab8c14ea9':'4395772d88f8aaf37691d2a7255e9f20' // 公众号的appsecret
