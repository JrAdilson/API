const db = require('../configs/pg')

const sql_get = 
 `select id, mod, idcliente, idprod, tprod, tval, obs from venda`
const getVenda = async () => {
    let venda = {}
    await db.query(sql_get)
    .then(ret => venda = {total: ret.rows.length, venda: ret.rows})
    .catch(err => venda = err.stack)
    return venda
}

const postVenda = async(params) => {
    const sql_insert = `insert into venda(mod, idcliente, idprod, tprod, tval, obs) values ($1, $2, $3, $4, $5, $6)`
    const {mod, idcliente, idprod, tprod, tval, obs} = params
    await db.query(sql_insert, [mod, idcliente, idprod, tprod, tval, obs])
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
    idcliente = $3,
    idprod = $4,
    tprod = $5, 
    tval = $6, 
    obs = $7 
    WHERE id = $1`
const putVenda = async(params) => {
    const {id, mod, idcliente, idprod, tprod, tval, obs} = params
    await db.query(sql_updateput, [id, mod, idcliente, idprod, tprod, tval, obs])
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
    if(params.idcliente){
        countParams++
        fields += `Cliente = $${countParams}`
        binds.push(params.idcliente)
    }
    if(params.idprod){
        countParams++
        fields += `Produto = $${countParams}`
        binds.push(params.idprod)
    }
    if(params.tprod){
        countParams++
        fields += `Total Produtos = $${countParams}`
        binds.push(params.tprod)
    }
    if(params.tval){
        countParams++
        fields += `Total Venda = $${countParams}`
        binds.push(params.tval)
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