const {io} = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado} = require('../controllers/socket');
const {grabarMensaje} = require('../controllers/socket');
// const Band = require('../models/band');
// //const Band = require('../models/band');
// const Bands = require('../models/bands');

// const bands = new Bands();

console.log('Init server');

// bands.addBand(new Band('Queen'));
// bands.addBand(new Band('Bon Jovi'));
// bands.addBand(new Band('Metalica'));
// bands.addBand(new Band('Heroes del Silencio'));

// console.log(bands);

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //client.emit('bandas-activas', bands.getBands());
    //client.on('event', data => { /* … */ });
    
   console.log(client.handshake.headers['x-token']);
   const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

   //Verificar autenticacion
   if(!valido){return client.disconnect();}

   //El cliente está conectado...
   usuarioConectado(uid);

   //ingresar al usuario a una sala especifica
   client.join(uid);

   client.on('disconnect', () => {

      console.log('Cliente desconectado');
      usuarioDesconectado(uid);
   });

   //Escuchar el mensaje personal
   client.on('mensaje-personal', async (payload) => {
      //console.log(payload);
      //Grabar mensaje
      await grabarMensaje(payload);

      io.to(payload.para).emit('mensaje-personal', payload);
   });

   // client.on('mensaje', (payload)=> {
   //    console.log('Mensaje!!!!', payload);

   //    io.emit('mensaje', {admin: 'Nuevo mensaje'});
   // });

    //  client.on('emitir-mensaje', (payload) => {
    //      //Esto emite a todos
    //      //io.emit('nuevo-mensaje', payload);
    //     console.log(payload);
    //      client.broadcast.emit('nuevo-mensaje', payload);
         
    //   });

    //Evento de votar
    // client.on('vote-band', (payload) => {

    //     console.log(payload);

    //     bands.voteBand(payload.id);
    //     io.emit('bandas-activas', bands.getBands());
    // })

    // //Evento de nueva banda
    // client.on('add-band', (payload) => {

    //     //console.log(payload);

    //     bands.addBand(new Band(payload.name));
    //     io.emit('bandas-activas', bands.getBands());
    // })

    // //Evento de borrar banda
    // client.on('delete-band', (payload) => {

    //     bands.deleteBand(payload.id);
    //     io.emit('bandas-activas', bands.getBands());
    // })
  });