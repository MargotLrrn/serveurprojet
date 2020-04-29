var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/home/margotlorrain/Documents/projet/Versio_complete/chirurgie_endoluminale.db');
const express = require('express')
const app = express()




let toSend = 'Serveur en attente... veuillez recharger la page en appuyant sur F5 !';

function buildResponseAdmin(sql_request) {
db.all(sql_request, [], (err, rows) => {
    if (err) {
        throw err;
    }
    toSend = '\
    <head> \
    <title> Toutes les données</title> \
    </head> \
    <body> \
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Logo_T%C3%A9l%C3%A9com_Physique_Strasbourg.png" width=429px height=172px alt="TPS"></img> \
    <h1 style="color:#005caa;font-size:3vw; text-align: center;">Toutes les données</h1> \
    <table style="border-collapse: collapse; font-size: 1vw; text-align: center;"> \
    <tr> \
    <th> ID </th> \
    <th> Nom </th> \
    <th> Prénom </th> \
    <th> Deuxième prénom</th> \
    <th> Nombre de tentatives menu paramètres modifiés </th> \
    <th> Nombre de tentatives menu paramètres non modifiés </th> \
    <th> Age </th> \
    <th> Formation </th> \
    <th> Endoscope </th> \
    <th> Temps </th> \
    <th> Pourcentage erreur </th> \
    <th> Tentative menu paramètres modifiés </th> \
    <th> Tentative menu paramètres non modifiés </th> \
    </tr>';
    rows.forEach((row) => {
        toSend += '<tr><td style="border: 1px solid black; width: 7.69vw">' + row.id + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.NOM + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.PRENOM + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.DEUXPRENOM + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.MENUAVECPARAMETRES + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.MENUSANSPARAMETRES + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.AGE + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.FORMATION + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.ENDOSCOPE + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.TEMPS + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.POURCENTAGEERREUR + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.TENTATIVEAVECPARAMETRES + '</td> \
        <td style="border: 1px solid black; width: 7.69vw;">'+ row.TENTATIVESANSPARAMETRES + '</td> \
        </tr>';
    });
    toSend += '</table></body>';
});
return toSend;
}

function buildResponseAnonyme(sql_request) {
    db.all(sql_request, [], (err, rows) => {
        if (err) {
            throw err;
        }
        toSend = '\
        <head> \
        <title> Données anonymes </title> \
        </head> \
        <body> \
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Logo_T%C3%A9l%C3%A9com_Physique_Strasbourg.png" width=429px height=172px alt="TPS"></img> \
        <h1 style="color:#005caa; font-size: 3vw; text-align: center;"> Données anonymes </h1> \
        <table style="border-collapse: collapse; font-size: 1.5vw; text-align: center;"> \
        <tr> \
        <th> ID </th> \
        <th> Age </th> \
        <th> Formation </th> \
        <th> Endoscope</th> \
        <th> Temps </th> \
        <th> Pourcentage erreur </th> \
        <th> Tentative menu paramètres modifiés </th> \
        <th> Tentative menu paramètres non modifiés </th> \
        </tr>';
        rows.forEach((row) => {
            toSend += '<tr><td style="border: 1px solid black; width: 12.5vw;">' + row.id + '</td> \
            <td style="border: 1px solid black; width: 12.5vw;">'+ row.AGE + '</td> \
            <td style="border: 1px solid black; width: 12.5vw;">'+ row.FORMATION + '</td> \
            <td style="border: 1px solid black; width: 12.5vw;">'+ row.ENDOSCOPE + '</td> \
            <td style="border: 1px solid black; width: 12.5vw;">'+ row.TEMPS + '</td> \
            <td style="border: 1px solid black; width: 12.5vw;">'+ row.POURCENTAGEERREUR + '</td> \
            <td style="border: 1px solid black; width: 12.5vw;">'+ row.TENTATIVEAVECPARAMETRES + '</td> \
            <td style="border: 1px solid black; width: 12.5vw;">'+ row.TENTATIVESANSPARAMETRES + '</td> \
            </tr>';
        });
        toSend += '</table></body>';
    });
    return toSend;
    }

let id = 0;

function buildResponseDB1(sql_request) {
    db.all(sql_request, [], (err, rows) => {
        if (err) {
            throw err;
        }
        toSend = '\
        <head> \
        <title>Vos données</title> \
        </head> \
        <body> \
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Logo_T%C3%A9l%C3%A9com_Physique_Strasbourg.png" width=429px height=172px alt="TPS"></img> \
        <h1 style="color:#005caa;font-size:3vw; text-align: center;"> Vos données </h1> \
        <table style="border-collapse: collapse; font-size: 1.5vw; text-align: center"> \
        <tr> \
        <th> ID </th> \
        <th> Nom </th> \
        <th> Prénom </th> \
        <th> Deuxième prénom</th> \
        <th> Nombre de tentatives menu paramètres modifiés </th> \
        <th> Nombre de tentatives menu paramètres non modifiés </th> \
        </tr>';
        rows.forEach((row) => {
            toSend += '<tr><td style="border: 1px solid black; width: 16.6vw;">' + row.id + '</td> \
            <td style="border: 1px solid black; width: 16.6vw;">'+ row.NOM + '</td> \
            <td style="border: 1px solid black; width: 16.6vw;">'+ row.PRENOM + '</td> \
            <td style="border: 1px solid black; width: 16.6vw;">'+ row.DEUXPRENOM + '</td> \
            <td style="border: 1px solid black; width: 16.6vw;">'+ row.MENUAVECPARAMETRES + '</td> \
            <td style="border: 1px solid black; width: 16.6vw;">'+ row.MENUSANSPARAMETRES + '</td> \
            </tr>';
            id = row.id;
        });
        toSend += '</table>';
    });
    return toSend;
    }

    let toSendDB2 = '';

    function buildResponseDB2(sql_request) {
        db.all(sql_request, [], (err, rows) => {
            if (err) {
                throw err;
            }
            toSendDB2 = '\
            <table style="border-collapse: collapse; font-size: 1.5vw; text-align: center;"> \
            <tr> \
            <th> ID </th> \
            <th> Age </th> \
            <th> Formation </th> \
            <th> Endoscope </th> \
            <th> Temps </th> \
            <th> Pourcentage erreur </th> \
            <th> Tentative menu paramètres modifiés </th> \
            <th> Tentative menu paramètres non modifiés </th> \
            </tr>';
            rows.forEach((row) => {
                toSendDB2 += '<tr><td style="border: 1px solid black; width: 12.5vw">' + row.id + '</td> \
                <td style="border: 1px solid black; width: 12.5vw;">'+ row.AGE + '</td> \
                <td style="border: 1px solid black; width: 12.5vw;">'+ row.FORMATION + '</td> \
                <td style="border: 1px solid black; width: 12.5vw;">'+ row.ENDOSCOPE + '</td> \
                <td style="border: 1px solid black; width: 12.5vw;">'+ row.TEMPS + '</td> \
                <td style="border: 1px solid black; width: 12.5vw;">'+ row.POURCENTAGEERREUR + '</td> \
                <td style="border: 1px solid black; width: 12.5vw;">'+ row.TENTATIVEAVECPARAMETRES + '</td> \
                <td style="border: 1px solid black; width: 12.5vw;">'+ row.TENTATIVESANSPARAMETRES + '</td> \
                </tr>';
            });
            toSendDB2 += '</table></body>';
        });
        return toSendDB2;
        }

app.get('/admin', async function (req, res) {
    let all_sql = 'SELECT * FROM SIMULATIONIDENTIFICATION INNER JOIN SIMULATIONDONNEES ON SIMULATIONIDENTIFICATION.id = SIMULATIONDONNEES.id;';
    const result = await buildResponseAdmin(all_sql);
    res.send(result);
});

app.get('/anonyme', async function (req, res) {
    let anonyme_sql = 'SELECT * FROM SIMULATIONDONNEES';
    const result = await buildResponseAnonyme(anonyme_sql);
    res.send(result);
});

app.get('/user', async function (req, res) {
    let user_sql1 = "SELECT * FROM SIMULATIONIDENTIFICATION WHERE NOM ='"+req.query.nom+"' AND PRENOM='"+req.query.prenom+"' AND DEUXPRENOM='"+req.query.deuxprenom+"';";
    result = await buildResponseDB1(user_sql1);
    result += '<br>';
    let user_sql2= 'SELECT * FROM SIMULATIONDONNEES WHERE id='+id+';';
    result += await buildResponseDB2(user_sql2);
    res.send(result);
});

app.get('/', async function (req, res) {
    res.sendFile(__dirname+'/index.html');
});

app.listen(3000, function () {
  console.log('Listening on port 3000 !');
});