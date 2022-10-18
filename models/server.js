const express = require( 'express' )
const { createServer } = require( 'http' )
const cors = require( 'cors' )
const fileUpload = require('express-fileupload')

const { dbConnect } = require( '../databases/config' )
const { socketController } = require('../sockets/socketController')

class Server {

   constructor(){
      this.app    = express()
      this.server = createServer( this.app )
      this.io     = require( 'socket.io' )( this.server )

      this.port   = process.env.PORT
      this.base   = '/api'
      this.paths  = {
         userPath:     `${ this.base }/usuarios`,
         authPath:     `${ this.base }/auth`,
         categoryPath: `${ this.base }/categorias`,
         productPath:  `${ this.base }/productos`,
         searchtPath:  `${ this.base }/search`,
         uploadPath:   `${ this.base }/uploads`
      }

      this.conectarDB()

      this.middlewares()

      this.routes()

      this.sockets()
   }

   async conectarDB(){
      await dbConnect()
   }

   sockets(){
      this.io.on( 'connection', ( socket ) => socketController( socket, this.io ) )
      
   }

   middlewares() {
      // directorio publico
      this.app.use( express.static( 'public' ) )

      // CORS
      this.app.use( cors() )

      // parseo del body
      this.app.use( express.json() );

      // file manage
      this.app.use( fileUpload({
         useTempFiles : true,
         tempFileDir : '/tmp/',
         createParentPath: true,
      }) )
   }


   routes() {
      this.app.use( this.paths["userPath"],     require( '../routes/user' ) )
      this.app.use( this.paths["authPath"],     require( '../routes/auth' ) )
      this.app.use( this.paths["categoryPath"], require( '../routes/category' ) )
      this.app.use( this.paths["productPath"],  require( '../routes/producto' ) )
      this.app.use( this.paths["searchtPath"],  require( '../routes/buscar' ) )
      this.app.use( this.paths["uploadPath"],   require( '../routes/upload' ) )
   }

   start(){
      this.server.listen( this.port, () => {
         console.log(`Server running in ${ this.port }`);
         console.log(`Go to http://localhost:${ this.port }/` );
      } );
   }
}

module.exports = Server