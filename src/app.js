const  configObject  = require("./config/config.js");
const { httpServer } = require("./server.js");


const PORT = configObject.port


httpServer.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${httpServer.address().port }`)
})