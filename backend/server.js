const express = require('express')
const cors = require("cors")
const sqlite3 = require('sqlite3')
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'urls.db'), sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
const app = express()




app.use(cors())
app.use(express.json())





const execute = (db, sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};






app.get("/:url", (req, res) => {
    const url = req.params.url
    const sql = `SELECT url FROM urls WHERE shortUrl = ?`;
    db.get(sql, [url], (err, row) => {
        if (err) {
            return res.send("error wtf");
        }
        if (row) {
            res.json({ url: row.url });
        } else {
            res.send("error wtf");
        }
    });



})





app.post("/sendUrl", async (req, res) => {
    const { url } = req.query
    const sql = `INSERT INTO urls(url, shortUrl) VALUES(?, ?)`;

    const randomUrl = Math.ceil(Math.random() * (1000000 - 100000) + 100000);

    try {
        await execute(db, sql, [url, randomUrl]);

    } catch (err) {
        console.error(err);
    }

    res.send({ "data": randomUrl })
})


app.listen(3000, async () => {

    const createTableSql = `
    CREATE TABLE IF NOT EXISTS urls (
        url TEXT NOT NULL,
        shortUrl TEXT NOT NULL
    )
`
    try {
        await execute(db, createTableSql);
        console.log("Database created");
    } catch (err) {
        console.error("Erro wtf");
    }



    console.log("server is running")
})