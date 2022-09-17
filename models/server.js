const express = require( 'express' )
const cors = require( 'cors' )


class Server {

   constructor(){
      this.app = express()
      this.port = process.env.PORT
      this.userRoutePath = "/api/usuarios"


      this.middlewares()

      this.routes()
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
   }

   listen(){
      this.app.listen( this.port, () => {
         console.log(`Server running in ${ this.port }`);
         console.log(`Go to http://localhost:${ this.port }/` );
      } );
   }
}

module.exports = Server