const { request, response } = require( 'express' );
const path = require( 'path' );
const fs = require( 'fs' )

const cloudinary = require( 'cloudinary' ).v2
cloudinary.config( process.env.CLOUDINARY_URL )

const { User, Product, Category } = require( '../models' )
const { subirFile } = require('../helpers/subirFile');

const cargarArchivo = async ( req = request, res = response ) => {
   try {
      
      const nameTemp = await subirFile( req.files, undefined, "img" )

      return res.status( 200 ).json( nameTemp )

   } catch ( error ) {
      console.log( error );
      return res.status( 500 ).json( {
         error
      } )
   }
}

const putImg = async ( req = request, res = response ) => {
   try {
      const { id, coleccion } = req.params
      let model;

      switch( coleccion ){
         case 'users':
            model = await User.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe un usuario con id: ${ id }` } )
            }
            break;
         case 'products':
            model = await  Product.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe un producto con id: ${ id }` } )
            }
            break;
         case 'categorys':
            model = await  Category.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe una categoria con id: ${ id }` } )
            }
            break;
      }
      
      if( model.img ){
         const pathImg = path.join( __dirname, '../uploads', coleccion, model.img )
         if( fs.existsSync( pathImg ) ){
            fs.unlinkSync( pathImg )
         }
      }

      const { nameTemp } = await subirFile( req.files, undefined, coleccion )
      model.img = nameTemp

      await model.save()

      return res.status( 200 ).json( model )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json( {
         error
      } )
   }
}

const putImgCloudinary = async ( req = request, res = response ) => {
   try {
      const { id, coleccion } = req.params
      let model;

      switch( coleccion ){
         case 'users':
            model = await User.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe un usuario con id: ${ id }` } )
            }
            break;
         case 'products':
            model = await  Product.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe un producto con id: ${ id }` } )
            }
            break;
         case 'categorys':
            model = await  Category.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe una categoria con id: ${ id }` } )
            }
            break;
      }
      
      if( model.img ){
         const img = model.img.split( '/' ).pop()
         const [ idImg, ] = img.split( '.' )
         await cloudinary.uploader.destroy( idImg )
      }

      const { tempFilePath } = req.files.sampleFile
      const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
      
      model.img = secure_url

      await model.save()

      return res.status( 200 ).json( model )

   } catch (error) {
      console.log( error );
      return res.status( 500 ).json( {
         error
      } )
   }
}



const getImg = async ( req = request, res = response ) => {
   try {
      const { id, coleccion } = req.params

      let model

      switch( coleccion ){
         case 'users':
            model = await User.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe un usuario con id: ${ id }` } )
            }
            break;
         case 'products':
            model = await  Product.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe un producto con id: ${ id }` } )
            }
            break;
         case 'categorys':
            model = await  Category.findById( id )
            if( !model ){
               return res.status( 400 ).json( { msg: `No existe una categoria con id: ${ id }` } )
            }
            break;
      }

      if( model.img ){
         const pathImg = path.join( __dirname, '../uploads', coleccion, model.img )
         if( fs.existsSync( pathImg ) ){
            return res.status( 200 ).sendFile( pathImg )
         }
      }

      const placeHolder = path.join( __dirname, '../assets/no-image.jpg' ) 

      return res.status( 200 ).sendFile( placeHolder )
   } catch (error) {
      console.log( error );
      return res.status( 500 ).json( {
         error
      } )
   }
}

module.exports = {
   cargarArchivo,
   putImg,
   putImgCloudinary,
   getImg
}