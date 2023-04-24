import axios from "axios";

const service = axios.create({
    timeout: 10000, // 设置统一的超时时长
    baseURL: process.env.NODE_ENV === "production" ? `/java` : "https://3226qg7485.zicp.fun",  // 线上 or 开发
    headers: {
        get: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            'token':sessionStorage.getItem('token')
            // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
        },
        post: {
            "Content-Type": "application/json;charset=utf-8",
            "token":sessionStorage.getItem('token')
            // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
        },
    },
    withCredentials: true, // 跨域请求时是否需要使用凭证
    transformRequest: [
        function(data) {
            data = JSON.stringify(data);
            return data;
        },
    ],
    // 在传递给 then/catch 前，修改响应数据
    transformResponse: [
        function(data) {
            if (typeof data === "string" && data.startsWith("{")) {
                data = JSON.parse(data);
            }
            return data;
        },
    ],
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // 错误抛到业务代码
        error.data = {};
        error.data.msg = "服务器异常，请联系管理员！";
        return Promise.resolve(error);
    }
);

// 根据不同的状态码，生成不同的提示信息
const showStatus = (status) => {
    const statusData = {
        400: "请求错误(400)",
        401: "未授权，请重新登录(401)",
        403: "拒绝访问(403)",
        404: "请求出错(404)",
        408: "请求超时(408)",
        500: "服务器错误(500)",
        501: "服务未实现(501)",
        502: "网络错误(502)",
        503: "服务不可用(503)",
        504: "网络超时(504)",
        505: "HTTP版本不受支持(505)",
    }
    let message = statusData[888] || `连接出错(${status})!`
    return `${message}，请检查网络或联系管理员！`;
};

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const { status } = response;
        let msg = "";
        if (status < 200 || status >= 300) {
            // 处理http错误，抛到业务代码
            msg = showStatus(status);
            if (typeof response.data === "string") {
                response.data = { msg };
            } else {
                response.data.msg = msg;
            }
        }
        return response;
    },
    (error) => {
        // 错误抛到业务代码
        error.data = {};
        error.data.msg = "请求超时或服务器异常，请检查网络或联系管理员！";
        return Promise.resolve(error);
    }
);

export default service;