const fornecedorController = require('../controllers/fornecedor')

module.exports = (app) => {
    app.get('/fornecedor', fornecedorController.getFornecedor),
    app.post('/fornecedor', fornecedorController.postFornecedor)
    app.delete('/fornecedor/:id', fornecedorController.deleteFornecedor)
    app.put('/fornecedor/:id', fornecedorController.putFornecedor)
    app.patch('/fornecedor/:id', fornecedorController.patchFornecedor)
}