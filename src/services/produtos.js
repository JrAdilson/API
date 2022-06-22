const db = require('../configs/pg')

const sql_get = 
 `select id, nome, custo, venda, lote, observacao from produtos`
const getProdutos = async () => {
    let produtos = {}
    await db.query(sql_get)
    .then(ret => produtos = {total: ret.rows.length, produtos: ret.rows})
    .catch(err => produtos = err.stack)
    return produtos
}

const sql_insert = 
   `insert into produtos(id, nome, custo, venda, lote, observacao) values ($1, $2, $3, $4, $5)`
const postProdutos = async(params) => {
    const { id, nome, custo, venda, lote, observacao} = params
    await db.query(sql_insert, [id, nome, custo, venda, lote, observacao])
}

const sql_delete =
    `delete from produtos WHERE id = $1`
const deleteProdutos = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = 
    `update produtos set 
    nome = $2, 
    custo = $3, 
    venda = $4, 
    lote = $5,
    observacao = $6 
    WHERE id = $1`
const putProdutos = async(params) => {
    const {id, nome, custo, venda, lote, observacao} = params
    await db.query(sql_updateput, [id, nome, custo, venda, lote, observacao])
}

const sql_updatepatch =
    `update produtos set
    `
const patchProdutos = async(params) => {
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if(params.nome){
        countParams++
        fields += `nome = $${countParams}`
        binds.push(params.nome)
    }
    if(params.custo){
        countParams++
        fields += `custo = $${countParams}`
        binds.push(params.custo)
    }
    if(params.venda){
        countParams++
        fields += `venda = $${countParams}`
        binds.push(params.venda)
    }
    if(params.lote){
        countParams++
        fields += `lote = $${countParams}`
        binds.push(params.lote)
    }
    if(params.observacao){
        countParams++
        fields += `observacao = $${countParams}`
        binds.push(params.observacao)
    }
    let sql = sql_updatepatch + fields + ' where id = $1 '
    return await db.query(sql, binds)
}
module.exports.postProdutos = postProdutos
module.exports.getProdutos = getProdutos
module.exports.deleteProdutos = deleteProdutos
module.exports.putProdutos = putProdutos
module.exports.patchProdutos = patchProdutos