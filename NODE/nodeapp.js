const http = require('express');
const app = express();
const port = 3000;
 
app.post('/insertar', (req, res) => {
  const { mail, noticias, promos } = req.body;
  console.log(req.params);
  res.sendFile(__dirname+"/succes.html")
})