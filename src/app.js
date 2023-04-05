const { httpServer } = require("./server");


const PORT = 8080 || process.env.PORT 

httpServer.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${httpServer.address().port }`)
})
