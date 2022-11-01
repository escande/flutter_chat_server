const {io} = require('../index');
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
    client.on('disconnect', () => {

        console.log('Cliente desconectado');
     });

     client.on('mensaje', (payload)=> {
        console.log('Mensaje!!!!', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
     });

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