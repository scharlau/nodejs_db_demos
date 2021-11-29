var express = require('express')
var app = express()

var HTTP_PORT = 8080
app.listen(HTTP_PORT, () => {
    console.log("server running on port %PORT".replace("%PORT", HTTP_PORT))
});

app.get('/', (req, res, next) => {
    res.json({"message": "OK"})
});

app.use(function(req, res){
    res.status(404);
});