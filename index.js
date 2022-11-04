const express = require('express');
const path = require('path');
require('dotenv').config();

//Db config
require('./database/config').dbConnection();
// const {dbConnection} = require('./database/config');
// dbConnection();

//App express
const app = express();

//Lectura y parseo del body
app.use(express.json());

//Mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mensajes', require('./routes/mensajes'));

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');


//Path publico
const publiPath = path.resolve(__dirname, 'public');

app.use(express.static(publiPath));

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo!;-)', process.env.PORT);
});