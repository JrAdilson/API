const db = require('../configs/pg')

const sql_get = 
 `select id, mod, idCliente, idProd, tProd, tVal, obs from venda`
const getVenda = async () => {
    let venda = {}
    await db.query(sql_get)
    .then(ret => venda = {total: ret.rows.length, venda: ret.rows})
    .catch(err => venda = err.stack)
    return venda
}

const sql_insert = 
   `insert into venda(id, mod, idCliente, idProd, tProd, tVal, obs) values ($1, $2, $3, $4, $5, $6, $7)`
const postVenda = async(params) => {
    const {id, mod, idCliente, idProd, tProd, tVal, obs} = params
    await db.query(sql_insert, [id, mod, idCliente, idProd, tProd, tVal, obs])
}

const sql_delete =
    `delete from venda WHERE id = $1`
const deleteVenda = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = 
    `update venda set 
    mod = $2, 
    idCliente = $3,
    idProd = $4,
    tProd = $5, 
    tVal = $6, 
    obs = $7 
    WHERE id = $1`
const putVenda = async(params) => {
    const {id, mod, idCliente, idProd, tProd, tVal, obs} = params
    await db.query(sql_updateput, [id, mod, idCliente, idProd, tProd, tVal, obs])
}

const sql_updatepatch =
    `update venda set
    `
const patchVenda = async(params) => {
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if(params.mod){
        countParams++
        fields += `modelo = $${countParams}`
        binds.push(params.mod)
    }
    if(params.idCliente){
        countParams++
        fields += `Cliente = $${countParams}`
        binds.push(params.idCliente)
    }
    if(params.idProd){
        countParams++
        fields += `Produto = $${countParams}`
        binds.push(params.idProd)
    }
    if(params.tProd){
        countParams++
        fields += `Total Produtos = $${countParams}`
        binds.push(params.tProd)
    }
    if(params.tVal){
        countParams++
        fields += `Total Venda = $${countParams}`
        binds.push(params.tVal)
    }
    if(params.obs){
        countParams++
        fields += `observacao = $${countParams}`
        binds.push(params.obs)
    }
    let sql = sql_updatepatch + fields + ' where id = $1 '
    return await db.query(sql, binds)
}
module.exports.postVenda = postVenda
module.exports.getVenda = getVenda
module.exports.deleteVenda = deleteVenda
module.exports.putVenda = putVenda
module.exports.patchVenda = patchVenda