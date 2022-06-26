const produtoController = require('../controllers/produto')

module.exports = (app) => {
    app.get('/produto', produtoController.getProduto),
    app.post('/produto', produtoController.postProduto)
    app.delete('/produto/:id', produtoController.deleteProduto)
    app.put('/produto/:id', produtoController.putProduto)
    app.patch('/produto/:id', produtoController.patchProduto)
}