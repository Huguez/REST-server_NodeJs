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
   img: {
      type: String,
   }
   
})

Category.methods.toJSON = function(){
   const { __v, state, ...rest } = this.toObject();
   return { ...rest }
}

module.exports = model( 'Category', Category ) 