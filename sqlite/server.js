var express = require('express')
var app = express()
var db = require("./database.js")
var bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'))

var HTTP_PORT = 8080
app.listen(HTTP_PORT, () => {
    console.log("server running on port %PORT".replace("%PORT", HTTP_PORT))
});
// original version
// app.get('/', (req, res, next) => {
//     res.json({"message": "OK"})
// });

// revised as app route
app.get("/", (req,res, next) => {
    var sql = "select * from quotes"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return
        }
        res.render('index.ejs', {quotes: rows})
        // res.json({
        //     "message":"success",
        //     "data":rows
        // })
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
// originally app.post("/api/quote/", (req,res, next) => {
app.post("/quote", (req,res, next) => {
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
        // res.json({
        //     "message": "success",
        //     "data": data,
        //     "id": this.lastID
        // })
        res.redirect('/')
    })
});
// get one yoda quote to delete
// then update that with vader quote
app.patch("/api/quote/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        quote: req.body.quote
    }
    console.log(req.body.name, req.body.quote, req.params.id)
    console.log(data)

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
        console.log('update query run')
        //res.redirect('/')
    });
})

app.delete("/api/quote/:id", (req, res, next) => {
    db.run(
        'DELETE FROM quotes WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            console.log('delete query run')
            console.log(this.changes)
            res.json({"message":"deleted", changes: this.changes})
           // res.redirect('/')
    });
})

app.use(function(req, res){
    res.status(404);
});