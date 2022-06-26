let vendaService = require('../services/venda')

const getVenda = async (req, res, next) => {
    try{
        await vendaService.getVenda()
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err) {
        next(err)
    }
}
const postVenda = async(req, res, next) => {
    try{
        await vendaService.postVenda(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const deleteVenda = async(req, res, next) => {
    try{
        await vendaService.deleteVenda(req.params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const putVenda = async(req,res,next) => {
    try{
        let params = req.body
        params.id = req.params.id
        await vendaService.putVenda(params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const patchVenda = async(req,res,next) => {
    try{
        let params = req.body
        params.id = req.params.id
        await vendaService.patchVenda(params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}
module.exports.postVenda = postVenda
module.exports.getVenda = getVenda
module.exports.deleteVenda = deleteVenda
module.exports.putVenda = putVenda
module.exports.patchVenda = patchVenda