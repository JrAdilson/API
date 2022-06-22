const db = require('../configs/pg')

const sql_get = 
 `select id, mod, tProd, tVal, obs from vendas`
const getVendas = async () => {
    let vendas = {}
    await db.query(sql_get)
    .then(ret => vendas = {total: ret.rows.length, vendas: ret.rows})
    .catch(err => vendas = err.stack)
    return vendas
}

const sql_insert = 
   `insert into vendas(id, mod, tProd, tVal, obs) values ($1, $2, $3, $4, $5)`
const postVendas = async(params) => {
    const { id, mod, tProd, tVal, obs} = params
    await db.query(sql_insert, [id, mod, tProd, tVal, obs])
}

const sql_delete =
    `delete from vendas WHERE id = $1`
const deleteVendas = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = 
    `update vendas set 
    mod = $2, 
    tProd = $3, 
    tVal = $4, 
    obs = $5 
    WHERE id = $1`
const putVendas = async(params) => {
    const {id, mod, tProd, tVal, obs} = params
    await db.query(sql_updateput, [id, mod, tProd, tVal, obs])
}

const sql_updatepatch =
    `update vendas set
    `
const patchVendas = async(params) => {
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if(params.mod){
        countParams++
        fields += `modelo = $${countParams}`
        binds.push(params.mod)
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
module.exports.postVendas = postVendas
module.exports.getVendas = getVendas
module.exports.deleteVendas = deleteVendas
module.exports.putVendas = putVendas
module.exports.patchVendas = patchVendas