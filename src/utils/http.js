import qs from "querystring"

export function get(url) {
    const result = fetch(url);
    return result;
}

export function post(url, data) {
    const result = fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: qs.stringify(data)
    })
    return result;
}