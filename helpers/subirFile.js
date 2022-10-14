const path = require( 'path' )
const { v4: uuidv4 } = require('uuid')


const subirFile = ( files, extValid = [ 'png', 'jpg', 'jpeg', 'png', 'gif' ], folder = "" ) => {
   return new Promise( ( resolve, reject ) => {

      const { sampleFile } = files

      const ext = sampleFile.name.split( '.' ).pop()

      if( !extValid.includes( ext ) ){
         return reject( "La extencion no es valida, extenciones validas: " + extValid.toString() )
      }
      
      const nameTemp = `${ uuidv4() }.${ ext }`

      const ruta = path.join( __dirname , '/../uploads/' , folder, nameTemp )
      
      sampleFile.mv( ruta, ( err ) => {
         if( err ){
            return reject( err )
         }
      } )

      return resolve( {nameTemp} )
   } )
}

module.exports = {
   subirFile
}