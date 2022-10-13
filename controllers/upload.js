const { request, response } = require( 'express' )
const path = require( 'path' )

const cargarArchivo = ( req = request, res = response ) => {
   try {
      
      if( !req.files || Object.keys( req.files ).length === 0 || !req.files.sampleFile ){
         return res.status( 400 ).json( { error: "No hay archivos" } )
      }

      const { sampleFile } = req.files

      const ext = sampleFile.name.split( '.' ).pop()

      const extValid = [ 'png', 'jpg', 'jpeg', 'png', 'gif' ]
      if( !extValid.includes( ext ) ){
         return res.status( 400 ).json( { msg: "La extencion no es valida, extenciones validas: " + extValid.toString() , ext } )
      }

      // const ruta = path.join( __dirname + '/../uploads/' + sampleFile.name )

      // sampleFile.mv( ruta, ( err ) => {
      //    if( err ){
      //       return res.status( 500 ).json( err )
      //    }
      // } )

      return res.status( 200 ).json( { msg: "ok", ext } )

   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         msg: "Error en cargar archivo",
         error
      } )
   }
}

module.exports = {
   cargarArchivo,
}