

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

           //TODO: validar JWT

           //Si el token no es valido, desconectar


           //TODO: Saber que usuario esta activo mediante el UID


           //TODO: Emitir todos los usuarios conectados


           //TODO: Socket Join, uid


           //TODO: Escuchar cuando cliente manda un mensaje
           //mensaje Personal


           //TODO: Disconnect
           //Marcar que el usuario se desconecto

           //TODO: Emitir todos los usuarios conectados
            
        
        });
    }


}


module.exports = Sockets;