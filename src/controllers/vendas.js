let vendasService = require('../services/vendas')

const getVendas = async (req, res, next) => {
    try{
        await vendasService.getVendas()
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err) {
        next(err)
    }
}
const postVendas = async(req, res, next) => {
    try{
        await vendasService.postVendas(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const deleteVendas = async(req, res, next) => {
    try{
        await vendasService.deleteVendas(req.params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const putVendas = async(req,res,next) => {
    try{
        let params = req.body
        params.id = req.params.id
        await vendasService.putVendas(params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const patchVendas = async(req,res,next) => {
    try{
        let params = req.body
        params.id = req.params.id
        await vendasService.patchVendas(params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}
module.exports.postVendas = postVendas
module.exports.getVendas = getVendas
module.exports.deleteVendas = deleteVendas
module.exports.putVendas = putVendas
module.exports.patchVendas = patchVendas