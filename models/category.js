const { Schema, model } = require( 'mongoose' )

const Category = Schema({
   name: {
      type: String,
      required: [ true, 'el nombre es obligatorio' ]
   },
   state: {
      type: Boolean,
      required: true,
      default: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   
})

Category.methods.toJSON = function(){
   return this.toObject();
}

module.exports = model( 'Category', Category ) 