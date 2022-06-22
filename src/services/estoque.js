const db = require('../configs/pg')

const sql_get = 
 `select id, qtd, local, ultentrada, observacao from estoque`
const getEstoque = async () => {
    let estoque = {}
    await db.query(sql_get)
    .then(ret => estoque = {total: ret.rows.length, estoque: ret.rows})
    .catch(err => estoque = err.stack)
    return estoque
}

const sql_insert = 
   `insert into estoque(id, qtd, local, ultentrada, observacao) values ($1, $2, $3, $4, $5)`
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
    qtd = $2, 
    local = $3, 
    ultentrada = $4, 
    observacao = $5 
    WHERE id = $1`
const putEstoque = async(params) => {
    const {id, qtd, local, ultentrada, observacao} = params
    await db.query(sql_updateput, [id, qtd, local, ultentrada, observacao])
}

const sql_updatepatch =
    `update estoque set
    `
const patchEstoque = async(params) => {
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
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
    if(params.ultentrada){
        countParams++
        fields += `Data ultima entrada = $${countParams}`
        binds.push(params.ultentrada)
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