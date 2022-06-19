const clienteController = require('../controllers/cliente')

module.exports = (app) => {
    app.get('/cliente', clienteController.getClientes),
    app.post('/cliente', clienteController.postClientes)
    app.delete('/cliente/:id', clienteController.deleteClientes)
    app.put('/cliente/:id', clienteController.putClientes)
    app.patch('/cliente/:id', clienteController.patchClientes)
}