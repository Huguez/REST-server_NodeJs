const mongoose = require( 'mongoose' )

const dbConnect = async () => {
   try{
      await mongoose.connect( process.env.MONGODB_CNN, { 
         useNewUrlParser: true,
         useUnifiedTopology: true,
      } )

      console.log( "Connect DB !!!" );

   }catch( err ){
      console.log( err );
      throw new Error( "Error al conectar la base de datos" )
   }
}

module.exports = {
   dbConnect
}