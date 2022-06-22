const estoqueController = require('../controllers/estoque')

module.exports = (app) => {
    app.get('/estoque', estoqueController.getEstoque),
    app.post('/estoque', estoqueController.postEstoque)
    app.delete('/estoque/:id', estoqueController.deleteEstoque)
    app.put('/estoque/:id', estoqueController.putEstoque)
    app.patch('/estoque/:id', estoqueController.patchEstoque)
}