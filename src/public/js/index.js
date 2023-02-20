const server = io()
const socket = io()
server.emit('mensaje', 'Soy un cliente')

socket.on('mensajeServer', data => {
    console.log(data)
})

socket.on('evento_para_todos_menos_el_actual', data => {
    console.log(data)
})

socket.on('evento_para_todos', data => {
    console.log(data)
})

let user
let chatbox = document.getElementById('chatbox')
Swal.fire({
    tittle: 'Ingrese sus datos',
    input: 'text',
    text: 'Alerta Basica con Sweetalert2',
    icon: 'success',
    inputValidator: value => {
        return !value && 'Necesitas escribir un nombre para poder continuar'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    socket.emit('authenticated', user)
})
const handleSocket = evt => {
    if (evt.key === "Enter") {
        if (chatbox.value.trim().lenght > 0) {
            socket.emit('message', {
                user,
                message: chatbox.value
            })
            chatbox.value = ''
        }
    }
}


chatbox.addEventListener('keyup', handleSocket)
socket.on('messageLog', data => {
    let log = document.getElementById('messageLog')
    let messages = ''
    data.forEach(mensaje => {
     messages = messages + `<li>${mensaje.user} dice: ${mensaje.message}</li><br>`
        
    });
    log.innerHTML = messages
})
socket.on('newUserConnected', data => {
    console.log(data)
    if (!user) return
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} sea unido al chat`,
        icon: "succes"
    })
})