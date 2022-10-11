const { request, responce } = require( 'express' )
const { Category } = require( "../models" )

const getCategorys = ( req = request, res = responce ) => {
   try {
      const categorias = "getCategorys"

      return res.status( 200 ).json( {
         categorias
      } )

   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}

const getCategory = ( req = request, res = responce ) => {
   try {
      const categoria = "getCategory"

      return res.status( 200 ).json( {
         categoria
      } )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}

const postCategory = ( req = request, res = responce ) => {
   try {
      const categoria = "postCategory"

      return res.status( 200 ).json( {
         categoria
      } )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}

const putCategory = ( req = request, res = responce ) => {
   try {
      const categoria = "putCategory"

      return res.status( 200 ).json( {
         categoria
      } )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}

const deleteCategory = ( req = request, res = responce ) => {
   try {
      const categoria = "deleteCategory"

      return res.status( 200 ).json( {
         categoria
      } )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json({
         error
      })
   }
}


module.exports = {
   getCategorys,
   getCategory,
   postCategory,
   putCategory,
   deleteCategory
}