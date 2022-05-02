const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');

class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            const token = socket.handshake.query['x-token'];

            //TODO: validar JWT
            const [valido, uid] = comprobarJWT(token);
            if (!valido) {
                console.log('Socket no identificado');
                return socket.disconnect();
            }

            await usuarioConectado(uid);
            //Si el token no es valido, desconectar

            //TODO: Saber que usuario esta activo mediante el UID

            //TODO: Emitir todos los usuarios conectados

            //TODO: Socket Join, uid

            //TODO: Escuchar cuando cliente manda un mensaje
            //mensaje Personal

            //TODO: Disconnect
            //Marcar que el usuario se desconecto
            socket.on('disconnect', async () => {
                await usuarioDesconectado(uid);
            });

            //TODO: Emitir todos los usuarios conectados
        });
    }
}

module.exports = Sockets;
