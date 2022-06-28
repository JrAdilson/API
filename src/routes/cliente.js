const clienteController = require('../controllers/cliente')

module.exports = (app) => {
    app.get('/cliente', clienteController.getCliente),
    
    /* #swagger.tags = ['Cliente']
       #swagger.sumary = 'Listagem de todos os clientes cadastrados.'
    */
    app.post('/cliente', clienteController.postCliente)
    app.delete('/cliente/:id', clienteController.deleteCliente)
    app.put('/cliente/:id', clienteController.putCliente)
    app.patch('/cliente/:id', clienteController.patchCliente)
}