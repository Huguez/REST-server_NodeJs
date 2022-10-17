const jwt = require( 'jsonwebtoken' )
const { User } = require( "../models" )

const generarJWT = async ( id = "" ) => {
   return new Promise( ( resolve, reject ) => {
      
      const payload = { id }
      const key = process.env.SECRET_KEY

      jwt.sign( payload, key, { expiresIn: "24h" }, ( err, token ) => {
         if( err ){
            console.log( err );
            reject( err )
         }else{
            resolve( token )
         }
      } )
   } )
}

const comprobarJWT = async ( token ) => {
   try {
      if ( token.length < 10 ) {
         return null
      }
      
      const { id } = jwt.verify( token, process.env.SECRET_KEY )
      const user = await User.findById( id )
      
      if( !user || !user.state ){
         return null
      }else{
         return user
      }

   } catch ( error ) {
      console.log( error );
      throw new Error( "Error comprobar JWT " )
   }
}
   
module.exports = {
   generarJWT,
   comprobarJWT
}