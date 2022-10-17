

const url = ( window.location.hostname.includes( "localhost" ) ) ? 'http://localhost:7070/api/auth/' : ''

let usuario = null

const validarJWT = async ( ) => {

   const xToken = localStorage.getItem( 'x-token' ) || ""
   if ( xToken.length <= 10 ) {
      window.location = "index.html"
      throw new Error( "No hay token en el servidor" )
   }

   const resp = await fetch( url+"renew", {
      headers: { 'x-token': xToken }
   });

   const { user, token } = await resp.json()
   
   localStorage.setItem( 'x-token', token )

   usuario = user
   
   document.title = "Chat | " + user.name

   await conectarSocket()
}

const conectarSocket = async () => {
   const socket = io({
      'extraHeaders': {
         'x-token': localStorage.getItem( 'x-token' )
      }
   })
   
}

const main  = async (  ) => {
   await  validarJWT()
}

main()
