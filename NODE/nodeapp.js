// DESCARGAR LAS DEPENDENCIAS ANTES DE CORRER
// npm install express
// npm install mysql
// npm install body-parser
// npm install path

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 5500;

function transformar(x){
  if (x == "on"){
    return 1;
  } 
  else{
    return 0;
  }
}


const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306, 
  user: 'alumno',       
  password: 'alumnoipm',       
  database: 'AIRV_DB'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

 
app.get('/insertar', (req, res) => {
  console.log("Hola!");
  const { mail, noticias, promos } = req.query;
  const sql = 'INSERT INTO Mails (mail, noticias, promos) VALUES (?, ?, ?)';
  db.query(sql, [mail, transformar(noticias), transformar(promos)], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
      res.status(500).send('Error al insertar en la base de datos');
    } else {
      res.redirect('../index.html');
    }
  });
})

app.listen(port,() => {
console.log(`Example app listening on port ${port}`)
})