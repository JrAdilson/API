const db = require('../configs/pg')

const sql_get = 
 `select id, idProduto, qtd, local, tipoMov, observacao from estoque`
const getEstoque = async () => {
    let estoque = {}
    await db.query(sql_get)
    .then(ret => estoque = {total: ret.rows.length, estoque: ret.rows})
    .catch(err => estoque = err.stack)
    return estoque
}

const sql_insert = 
   `insert into estoque(id, idProduto, qtd, local, tipoMov, observacao) values ($1, $2, $3, $4, $5, $6)`
const postEstoque = async(params) => {
    const { id, qtd, local, ultentrada, observacao} = params
    await db.query(sql_insert, [id, qtd, local, ultentrada, observacao])
}

const sql_delete =
    `delete from estoque WHERE id = $1`
const deleteEstoque = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = 
    `update estoque set
    idProduto = $2, 
    qtd = $3, 
    local = $4, 
    tipoMov = $5, 
    observacao = $6 
    WHERE id = $1`
const putEstoque = async(params) => {
    const {id, idProduto, qtd, local, tipoMov, observacao} = params
    await db.query(sql_updateput, [id, idProduto, qtd, local, tipoMov, observacao])
}

const sql_updatepatch =
    `update estoque set
    `
const patchEstoque = async(params) => {
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if(params.idProduto){
        countParams++
        fields += `Id do Produto = $${countParams}`
        binds.push(params.idProduto)
    }
    if(params.qtd){
        countParams++
        fields += `Quantidade suportada = $${countParams}`
        binds.push(params.qtd)
    }
    if(params.local){
        countParams++
        fields += `local = $${countParams}`
        binds.push(params.local)
    }
    if(params.tipoMov){
        countParams++
        fields += `Tipo movimentacao = $${countParams}`
        binds.push(params.tipoMov)
    }
    if(params.observacao){
        countParams++
        fields += `Observacao = $${countParams}`
        binds.push(params.observacao)
    }
    let sql = sql_updatepatch + fields + ' where id = $1 '
    return await db.query(sql, binds)
}
module.exports.postEstoque = postEstoque
module.exports.getEstoque = getEstoque
module.exports.deleteEstoque = deleteEstoque
module.exports.putEstoque = putEstoque
module.exports.patchEstoque = patchEstoque