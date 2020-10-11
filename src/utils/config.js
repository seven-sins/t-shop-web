import axios from "axios";

const service = axios.create();
/**
 * 拦截请求
 */
service.interceptors.request.use( config => {
    return config;
})

/**
 * 拦截响应
 */
service.interceptors.response.use( response => {
    return response;
}, error => {
    // 不将错误信息返回到then
    return new Promise(() => {}); 
})

export default service;