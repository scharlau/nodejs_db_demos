var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = 'db.sqlite'

let db = new sqlite3.Database(DBSOURCE, (err) =>{
    if (err) {
        // cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('conneted to database')
        db.run(`CREATE TABLE quotes (
            id INTEGER PRIMARY KEY,
            name text,
            quote text)`,
            (err) => {
                if (err){
                    // table already created
                } else {
                    var insert = 'INSERT INTO quotes (name, quote) VALUES (?,?)'
                    db.run(insert, ["luke", "nooooo!"])
                    db.run(insert, ["yoda", "may the force be with you"])
                    db.run(insert, ["ben", "use the force"])
                }
            });
    }
});

module.exports = db