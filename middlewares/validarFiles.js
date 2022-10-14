const { response, request } = require('express')


const validarFiles = ( req = request, res = response, next ) => {

   if( !req.files || Object.keys( req.files ).length === 0 || !req.files.sampleFile ){
      return res.status( 400 ).json( { error: "validarFiles - No hay archivos" } )
   }
   next()
   
}

module.exports = {
   validarFiles
}