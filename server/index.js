const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send({
        msg: "hello"
    })
});

app.listen(3030, (req, res) => {
    console.log("服务器运行在3030")

});