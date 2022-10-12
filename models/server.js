const express = require( 'express' )
const cors = require( 'cors' )
const { dbConnect } = require( '../databases/config' )

class Server {

   constructor(){
      this.app = express()
      this.port = process.env.PORT
      this.base = '/api'
      this.paths = {
         userRoutePath: `${ this.base }/usuarios`,
         authPath:      `${ this.base }/auth`,
         categoryPath:  `${ this.base }/categorias`,
         productPath:   `${ this.base }/productos`,
         searchtPath:   `${ this.base }/search`
      }

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
      this.app.use( this.paths["userRoutePath"], require( '../routes/user' ) )
      this.app.use( this.paths["authPath"],      require( '../routes/auth' ) )
      this.app.use( this.paths["categoryPath"],  require( '../routes/category' ) )
      this.app.use( this.paths["productPath"],   require( '../routes/producto' ) )
      this.app.use( this.paths["searchtPath"],   require( '../routes/buscar' ) )
      
   }

   start(){
      this.app.listen( this.port, () => {
         console.log(`Server running in ${ this.port }`);
         console.log(`Go to http://localhost:${ this.port }/` );
      } );
   }
}

module.exports = Server