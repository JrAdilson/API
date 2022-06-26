const vendaController = require('../controllers/venda')

module.exports = (app) => {
    app.get('/venda', vendaController.getVenda),
    app.post('/venda', vendaController.postVenda)
    app.delete('/venda/:id', vendaController.deleteVenda)
    app.put('/venda/:id', vendaController.putVenda)
    app.patch('/venda/:id', vendaController.patchVenda)
}