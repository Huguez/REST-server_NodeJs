
const myForm = document.querySelector( "#formId" )

const url = ( window.location.hostname.includes( "localhost" ) ) ? 'http://localhost:7070/api/auth/' : ''


myForm.addEventListener( 'submit', e => {
   e.preventDefault()

   const formData = {}

   for( let elem of myForm.elements ){
      if( elem.name.length > 0 ){
         formData[elem.name] = elem.value
      }
   }
   
   fetch( url+"login", {
      method: "POST",
      body: JSON.stringify( formData ),
      headers: { 'Content-Type': "application/json" }
   } ).then( resp => resp.json() ).then( ({ token }) => {
      
      localStorage.setItem( 'x-token', token )
      window.location = "chat.html"

   } ).catch( err => console.log( err ) )

} )