const server = io()
server.emit('mensaje', 'Soy un cliente')