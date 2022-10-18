class Mensaje {
   
   constructor( uid, nombre, mensaje ){
      this.uid     = uid
      this.nombre  = nombre
      this.mensaje = mensaje
   }

}


class ChatMensajes {

   constructor(){
      this.mensajes = []
      this.usuarios = {}

   }

   get last10(){
      this.mensajes = this.mensajes.splice( 0, 10 )
      return this.mensajes
   }

   get usuariosArr(){
      return Object.values( this.usuarios )
   }

   enviarMensaje( uid, name, mensaje ){
      this.mensajes.unshift( new Mensaje( uid, name, mensaje ) )
   }

   agregarUsuario( u ){
      this.usuarios[ u._id.toString() ] = u
   }

   desconectarUsuario( uid ){
      delete this.usuarios[uid]

   }
}


module.exports = {
   ChatMensajes,
   Mensaje
}