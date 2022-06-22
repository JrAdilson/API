let fornecedorService = require('../services/fornecedor')

const getFornecedor = async (req, res, next) => {
    try{
        await fornecedorService.getFornecedor()
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err) {
        next(err)
    }
}
const postFornecedor = async(req, res, next) => {
    try{
        await fornecedorService.postFornecedor(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const deleteFornecedor = async(req, res, next) => {
    try{
        await fornecedorService.deleteFornecedor(req.params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const putFornecedor = async(req,res,next) => {
    try{
        let params = req.body
        params.id = req.params.id
        await fornecedorService.putFornecedor(params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}

const patchFornecedor = async(req,res,next) => {
    try{
        let params = req.body
        params.id = req.params.id
        await fornecedorService.patchFornecedor(params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}
module.exports.postFornecedor = postFornecedor
module.exports.getFornecedor = getFornecedor
module.exports.deleteFornecedor = deleteFornecedor
module.exports.putFornecedor = putFornecedor
module.exports.patchFornecedor = patchFornecedor