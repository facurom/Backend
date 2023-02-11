const server = io()
server.emit('mensaje', 'Soy un cliente')

socket.on('mensajeServer', data =>{
    console.log(data) 
})

socket.on('evento_para_todos_menos_el_actual', data =>{
    console.log(data)
})

socket.on('evento_para_todos', data =>{
    console.log(data) 
})
