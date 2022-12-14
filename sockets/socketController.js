const { comprobarJWT } = require( '../helpers' )
const { ChatMensajes } = require('../models')

const chatM = new ChatMensajes()


const socketController = async ( socket, io ) => {

   const token = socket.handshake.headers["x-token"]
   const usuario = await comprobarJWT( token )
   
   if( !usuario ){
      return socket.disconnect()
   }
   
   chatM.agregarUsuario( usuario )

   io.emit( 'users-active', chatM.usuariosArr )

   socket.emit( 'receive-msg', chatM.last10 )

   socket.join( usuario._id.toString() );
   

   socket.on( 'disconnect', () => {
      chatM.desconectarUsuario( usuario._id.toString() )
      io.emit( 'users-active', chatM.usuariosArr )
   } )

   socket.on( 'send-msg', ( { uid, mensaje } ) => {
      
      if( uid ){
         socket.to( uid ).emit( 'private-msg', { de: usuario.name, mensaje } )
      }else{  
         chatM.enviarMensaje( usuario._id.toString(), usuario.name, mensaje )
         io.emit( 'receive-msg', chatM.last10 )
      }
   } )
}

module.exports = {
   socketController
}