const  configObject  = require("./config/config.js");
const { httpServer } = require("./server.js");
const express = require ('express')

const swaggerJsDoc= require ('swagger-jsdoc');
const swaggerUiExpress = require ('swagger-ui-express');
const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.8.1',
        info: {
            tittle: 'Documentacion de nuestra app ',
            description: 'Api pensada para ecommerce'
        }
    },
    apis: [`~${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsDoc(swaggerOptions)

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

const PORT = configObject.PORT

httpServer.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${httpServer.address().port }`)
})