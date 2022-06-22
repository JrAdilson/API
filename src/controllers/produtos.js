let produtosService = require('../services/produtos')

const getProdutos = async (req, res, next) => {
    try{
        await produtosService.getProdutos()
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err) {
        next(err)
    }
}
const postProdutos = async(req, res, next) => {
    try{
        await produtosService.postProdutos(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const deleteProdutos = async(req, res, next) => {
    try{
        await produtosService.deleteProdutos(req.params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const putProdutos = async(req,res,next) => {
    try{
        let params = req.body
        params.id = req.params.id
        await produtosService.putProdutos(params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const patchProdutos = async(req,res,next) => {
    try{
        let params = req.body
        params.id = req.params.id
        await produtosService.patchProdutos(params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}
module.exports.postProdutos = postProdutos
module.exports.getProdutos = getProdutos
module.exports.deleteProdutos = deleteProdutos
module.exports.putProdutos = putProdutos
module.exports.patchProdutos = patchProdutos