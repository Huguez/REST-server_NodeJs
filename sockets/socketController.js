const { comprobarJWT } = require( '../helpers' )


const socketController = async ( socket ) => {
   const token = socket.handshake.headers["x-token"]
   const usuario = await comprobarJWT( token )
   
   if( !usuario ){
      return socket.disconnect()
   }

   console.log( "se conecto: ", usuario.name );
}

module.exports = {
   socketController
}