var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db.db');
const express = require('express')
const app = express()



let toSend = 'Serveur en attente... veuillez recharger la page en appuyant sur F5 !';

function buildResponse(sql_request) {
db.all(sql_request, [], (err, rows) => {
    if (err) {
        throw err;
    }
    toSend = '\
    <h1 style="color:blue;">Projet / Toutes les données</h1> \
    <table style="border-collapse: collapse;">';
    rows.forEach((row) => {
        console.log(row.nombre);
        toSend += '<tr><td style="border: 1px solid black">' + row.nombre + '</td></tr>';
    });
    toSend += '</table>';
});
return toSend;
}

app.get('/admin', async function (req, res) {
    let all_sql = 'SELECT * FROM mydb;';
    const result = await buildResponse(all_sql);
    res.send(result);
});

app.get('/user', async function (req, res) {
    let user_sql = 'SELECT * FROM mydb WHERE nombre ='+req.query.nombre+';';
    const result = await buildResponse(user_sql);
    res.send(result);
});

app.get('/', async function (req, res) {
    res.sendFile(__dirname+'/index.html');
});

app.listen(3000, function () {
  console.log('Listening on port 3000 !');
});