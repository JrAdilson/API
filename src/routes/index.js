const Cliente = require ('./cliente')
const Fornecedor = require ('./fornecedor')
const Estoque = require ('./estoque')
const Produto = require ('./produto')
const Venda = require ('./venda')
module.exports = (app) => {
    Cliente(app)
    Fornecedor(app)
    Estoque(app)
    Produto(app)
    Venda(app)
}
