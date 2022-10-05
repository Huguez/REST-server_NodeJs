const jwt = require( 'jsonwebtoken' )

const generarJWT = async ( id = "" ) => {
   return new Promise( ( resolve, reject ) => {
      
      const payload = { id }
      const key = process.env.SECRET_KEY

      jwt.sign( payload, key, { expiresIn: "4h" }, ( err, token ) => {
         if( err ){
            console.log( err );
            reject( err )
         }else{
            resolve( token )
         }
      } )
   } )
}

   
module.exports = {
   generarJWT
}