const { Schema, model } = require( 'mongoose' )

const Producto = Schema( {
   name: {
      type: String,
      required: [ true, "El nombre es obligatorio" ],
      unique: true,
   },
   state: {
      type: Boolean,
      required: true,
      default: true
   },
   categoria: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [ true, "El id de la categoria es obligatorio" ]
   },
   user:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [ true, "el id del usuario es requerido" ]
   },
   precio: {
      type: Number,
      default: 0.0
   },
   descripcion:{
      type: String,
   },
   disponible: {
      type: Boolean,
      default: true
   }
} )

Producto.methods.toJSON = function() {
   const { __v, state, ...data } = this.toObject()
   return data
}

module.exports = model( 'Product', Producto )