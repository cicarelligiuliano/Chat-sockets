const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require('../controllers/socket');
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

            //Unir al usuario a una sala de socket.io
            socket.join(uid);

            //TODO: Saber que usuario esta activo mediante el UID
            await usuarioConectado(uid);

            //TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());

            //TODO: Socket Join, uid

            //TODO: Escuchar cuando cliente manda un mensaje
            //mensaje Personal
            socket.on('mensaje-personal', async (payload) => {
                const mensaje = await grabarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
            });

            //TODO: Disconnect
            //Marcar que el usuario se desconecto
            socket.on('disconnect', async () => {
                await usuarioDesconectado(uid);
                this.io.emit('lista-usuarios', await getUsuarios());
            });

            //TODO: Emitir todos los usuarios conectados
        });
    }
}

module.exports = Sockets;
