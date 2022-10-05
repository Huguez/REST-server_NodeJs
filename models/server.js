const express = require( 'express' )
const cors = require( 'cors' )
const { dbConnect } = require( '../databases/config' )

class Server {

   constructor(){
      this.app = express()
      this.port = process.env.PORT
      this.userRoutePath = "/api/usuarios"
      this.authPath = "/api/auth"

      this.conectarDB()

      this.middlewares()

      this.routes()
   }

   async conectarDB(){
      await dbConnect()
   }

   middlewares() {
      // directorio publico
      this.app.use( express.static( 'public' ) )

      // CORS
      this.app.use( cors() )

      // parseo del body
      this.app.use( express.json() );
   }


   routes() {
      this.app.use( this.userRoutePath, require( '../routes/user' ) )
      this.app.use( this.authPath, require( '../routes/auth' ) )
   }

   start(){
      this.app.listen( this.port, () => {
         console.log(`Server running in ${ this.port }`);
         console.log(`Go to http://localhost:${ this.port }/` );
      } );
   }
}

module.exports = Server