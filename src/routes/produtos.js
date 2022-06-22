const produtosController = require('../controllers/produtos')

module.exports = (app) => {
    app.get('/produtos', produtosController.getProdutos),
    app.post('/produtos', produtosController.postProdutos)
    app.delete('/produtos/:id', produtosController.deleteProdutos)
    app.put('/produtos/:id', produtosController.putProdutos)
    app.patch('/produtos/:id', produtosController.patchProdutos)
}