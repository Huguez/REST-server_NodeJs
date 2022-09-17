const { request, responce } = require( "express" )

const getUser = ( req = request, res = responce ) => {
   try {
      return res.status( 200 ).json( {
         msg: "Hello GET!!!",
      } )
   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         msg: error
      } )
   }
}

const putUser = ( req = request, res = responce ) => {
   try {
      const { body:data, params:{ id } } = req
      const { wawa, tako } = req.query
      
      return res.status( 200 ).json( {
         msg: "Hello PUT!!!",
         user: { 
            id: Number( id ), 
            ...data, 
            wawa, 
            tako 
         }
      } )
   } catch ( error ) {
      return res.status( 500 ).json( {
         error
      } )
   }
}

const postUser = ( req = request, res = responce ) => {
   try {
      const data = req.body
      console.log( data );

      return res.status( 200 ).json( {
         msg: "Hello POST!!!",
         user: data,
      } )
   } catch ( error ) {
      return res.status( 500 ).json( {
         error
      } )
   }
}

const deleteUser = ( req = request, res = responce ) => {
   return res.status( 200 ).json( {
      msg: "Hello DELETE!!!",
   } )
}

module.exports = {
   getUser,
   putUser,
   postUser,
   deleteUser
}