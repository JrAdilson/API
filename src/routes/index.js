const Clientes = require ('./cliente')
module.exports = (app) => {
    Clientes(app)
}

const Vendas = require('./vendas')
module.exports = (app) => {
    Vendas(app)
}

const Fornecedor = require('./fornecedor')
module.exports = (app) => {
    Fornecedor(app)
}

const Produtos = require('./produtos')
module.exports = (app) => {
    Produtos(app)
}

const Estoque = require('./estoque')
module.exports = (app) => {
    Estoque(app)
}