const db = require('../configs/pg')

const sql_get = 
 `select id, nome, custo, venda, lote, observacao from produto`
const getProduto = async () => {
    let produto = {}
    await db.query(sql_get)
    .then(ret => produto = {total: ret.rows.length, produto: ret.rows})
    .catch(err => produto = err.stack)
    return produto
}

const sql_insert = 
   `insert into produto(nome, custo, venda, lote, observacao) values ($1, $2, $3, $4, $5)`
const postProduto = async(params) => {
    const {nome, custo, venda, lote, observacao} = params
    await db.query(sql_insert, [nome, custo, venda, lote, observacao])
}

const sql_delete =
    `delete from produto WHERE id = $1`
const deleteProduto = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = 
    `update produto set 
    nome = $2, 
    custo = $3, 
    venda = $4, 
    lote = $5,
    observacao = $6 
    WHERE id = $1`
const putProduto = async(params) => {
    const {id, nome, custo, venda, lote, observacao} = params
    await db.query(sql_updateput, [id, nome, custo, venda, lote, observacao])
}

const sql_updatepatch =
    `update produto set
    `
const patchProduto = async(params) => {
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
module.exports.postProduto = postProduto
module.exports.getProduto = getProduto
module.exports.deleteProduto = deleteProduto
module.exports.putProduto = putProduto
module.exports.patchProduto = patchProduto