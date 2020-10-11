import axios from "axios";

const http = {
    get: (url, arg = {}) => {
        axios.get(url, arg).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    },
    post: (url, arg = {}) => {
        axios.post(url, arg).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    },
    put: (url, arg = {}) => {
        axios.put(url, arg).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    },
    delete: (url) => {
        axios.delete(url).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    }
}

export default http;
