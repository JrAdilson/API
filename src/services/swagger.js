const swaggerAutogen = require('swagger-autogen')('pt-BR')

const doc = {
    info:{
        versio: "1.0.0",
        title: "API - eCommercio",
        description: "Documentação da API, projeto: eCommercio"
    },
    host: `localhost:3000`,
    basePath: "",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
}
const outputFile = './src/docs/swagger.yaml'
const endpointsFiles = [
    './src/routes/cliente.js',
    './src/routes/estoque.js',
    './src/routes/fornecedor.js',
    './src/routes/produto.js',
    './src/routes/venda.js'
]
swaggerAutogen(outputFile, endpointsFiles, doc);