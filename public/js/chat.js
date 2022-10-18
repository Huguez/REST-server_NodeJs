const url = ( window.location.hostname.includes( "localhost" ) ) ? 'http://localhost:7070/api/auth/' : ''

let usuario = null
let socket = null

const btnLogout    = document.querySelector( "#btnLogout" )
const listMensajes = document.querySelector( "#listMensajes" )
const listUsers    = document.querySelector( "#listUsers" )
const txtMSG       = document.querySelector( "#txtMSG" )
const txtUID       = document.querySelector( "#txtUID" )


const dibujarUsuarios = ( users = [] ) => {

   let usersHtml = ''

   users.forEach( ( { name, uid } ) => {
      usersHtml += `
         <li>
            <p>
               <h4 class="text-success">${ name }</h4>
               <span class="text-muted">${ uid }</span>
            </p>
         </li>
      `
   } )

   listUsers.innerHTML = usersHtml
}

const dibujarMensajes = ( msgs = [] ) => {
   let msgsHtml = ''
   console.log( msgs );
   msgs.reverse().forEach( ( { mensaje, nombre } ) => {
      msgsHtml += `
         <li>
            <p>
               <span class="text-primary"> ${ nombre }: </span>
               <span> ${ mensaje } </span>   
            </p>
         </li>
      `
   } )

   listMensajes.innerHTML = msgsHtml
}

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
   socket = io({
      'extraHeaders': {
         'x-token': localStorage.getItem( 'x-token' )
      }
   })
   
   socket.on( 'connect', () => {
      console.log("Sockets online!!!");
   } )

   socket.on( 'disconnect', () => {
      console.log("Sockets off-line");
   } )

   socket.on( 'send-msg', ( payload ) => {
      console.log( "send-msg: ", payload );

   } )

   socket.on( 'receive-msg', dibujarMensajes )   

   socket.on( 'users-active', dibujarUsuarios )

   socket.on( 'private-msg', ( { de, mensaje } ) => {
      // console.log( "private-msg: ", payload );
      alert( `${ mensaje } de ${ de }` )
   } )

}

txtMSG.addEventListener( "keyup", ( e ) => {
   
   const mensaje = txtMSG.value
   const uid = txtUID.value
   
   if( e.keyCode !== 13 ) { return }
   if( mensaje.length === 0 ) { return }

   socket.emit( 'send-msg', { mensaje, uid } )

   txtMSG.value = ''
} )

const main  = async (  ) => {
   await  validarJWT()
}

main()
