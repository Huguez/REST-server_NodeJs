const { Schema, model } = require( 'mongoose' )

const User = Schema({
   name: {
      type: String,
      required: [ true, 'El nombre es obligatorio' ],
   },
   email: {
      type: String,
      required: [ true, 'El correo es obligatorio' ],
      unique: true
   },
   password: {
      type: String,
      required: [ true, 'La contrasena es obligatorio' ],
   },
   img: {
      type: String,
   },
   role: {
      type: String,
      required: [ true, 'El rol es obligatorio' ],
      enum: [ 'ADMIN_ROLE', 'USER_ROLE' ]
   },
   state: {
      type: Boolean,
      default: true
   },
   google:{
      type: Boolean,
      default: false
   }
   
})

User.methods.toJSON = function(){
   const { __v, password, ...usuario } = this.toObject();
   return usuario
}

module.exports = model( 'User', User ) 