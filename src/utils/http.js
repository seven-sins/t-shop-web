import axios from "axios";

/**
 * 拦截请求
 */
axios.interceptors.request.use( config => {
    s.lock();
    return config;
})

/**
 * 拦截响应
 */
axios.interceptors.response.use( response => {
    s.unlock();
    return response.data;
}, error => {
    s.unlock();
    // 不将错误信息返回到then
    return new Promise(() => {}); 
})

const http = {
    get: (url, arg = {}, success, error) => {
        let query = [], param = "";
        if (typeof arg == "object"){
            for (let key in arg) {
                if(arg[key]){
                    query[query.length] = encodeURI(key) + "=" + encodeURIComponent(arg[key]);
                }
            }
            param = query.join('&');
            if(param){
                if(url.match(/\?/)){
                    url += "&" + param;
                } else{
                    url += "?" + param;
                }
            }
        }
        axios.get(url, arg).then(response => {
            if (response.code === 200) {
                if(typeof success == "function"){
                    success.call(this, response);
                } else{
                    s.alert({msg: "回调函数不存在", title: "错误信息"});
                }
            } else{
                setTimeout(() => {
                    s.alert({msg: response.msg, title: "错误信息"});
                }, 60)
                if(typeof error == "function"){
                    error.call();
                }
            }
        }).catch(err => {
            s.alert(err);
            if(typeof error == "function"){
                error.call();
            }
        })
    },
    post: (url, arg = {}, success, error) => {
        axios.post(url, arg).then(response => {
            if (response.code === 200) {
                if(typeof success == "function"){
                    success.call(this, response);
                } else{
                    s.alert({msg: "回调函数不存在", title: "错误信息"});
                }
            } else{
                setTimeout(() => {
                    s.alert({msg: response.msg, title: "错误信息"});
                }, 60);
                if(typeof error == "function"){
                    error.call();
                }
            }
        }).catch(err => {
            s.alert(err);
            if(typeof error == "function"){
                error.call();
            }
        })
    },
    put: (url, arg = {}, success, error) => {
        axios.put(url, arg).then(response => {
            if (response.code === 200) {
                if(typeof success == "function"){
                    success.call(this, response);
                } else{
                    s.alert({msg: "回调函数不存在", title: "错误信息"});
                }
            } else{
                setTimeout(() => {
                    s.alert({msg: response.msg, title: "错误信息"});
                }, 60);
                if(typeof error == "function"){
                    error.call();
                }
            }
        }).catch(err => {
            s.alert(err);
            if(typeof error == "function"){
                error.call();
            }
        })
    },
    delete: (url, arg = {}, success, error) => {
        axios.delete(url).then(response => {
            if (response.code === 200) {
                if(typeof success == "function"){
                    success.call(this, response);
                } else{
                    s.alert({msg: "回调函数不存在", title: "错误信息"});
                }
            } else{
                setTimeout(() => {
                    s.alert({msg: response.msg, title: "错误信息"});
                }, 60);
                if(typeof error == "function"){
                    error.call();
                }
            }
        }).catch(err => {
            s.alert(err);
            if(typeof error == "function"){
                error.call();
            }
        })
    }
}

export default http;
