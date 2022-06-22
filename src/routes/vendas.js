const vendasController = require('../controllers/vendas')

module.exports = (app) => {
    app.get('/vendas', vendasController.getVendas),
    app.post('/vendas', vendasController.postVendas)
    app.delete('/vendas/:id', vendasController.deleteVendas)
    app.put('/vendas/:id', vendasController.putVendas)
    app.patch('/vendas/:id', vendasController.patchVendas)
}