var express = require('express')
var app = express()
var db = require("./database.js")
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

var HTTP_PORT = 8080
app.listen(HTTP_PORT, () => {
    console.log("server running on port %PORT".replace("%PORT", HTTP_PORT))
});

app.get('/', (req, res, next) => {
    res.json({"message": "OK"})
});

app.get("/api/quotes", (req,res, next) => {
    var sql = "select * from quotes"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

app.get("/api/quote/:id", (req, res, next) => {
    var sql = "select * from quotes where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/quote/", (req,res, next) => {
    var errors = []
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (!req.body.quote){
        errors.push("No quote specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        quote: req.body.quote
    }
    var sql = 'INSERT INTO quotes (name, quote) VALUES (?,?)'
    var params = [data.name, data.quote]
    db.run(sql, params, function(err, result){
        if (err) {
            res.status(400).json({"error":"err.message"})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    })
});

app.patch("/api/quote/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        quote: req.body.quote
    }
    console.log(req.body.name, req.body.quote, req.params.id)
    // note backtick for quote mark
    db.run( `UPDATE quotes SET
    name = ?,
    quote = ?
    WHERE id = ?`,
    [data.name, data.quote, req.params.id],
    function(err, result){
        if (err) {
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({
            message: "success",
            data: data,
            changes: this.changes
        })
    });
})

app.use(function(req, res){
    res.status(404);
});