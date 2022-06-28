const db = require('../configs/pg')

const sql_get = 
 `select id, idproduto, qtd, locals, tipomov, observacao from estoque`
const getEstoque = async () => {
    let estoque = {}
    await db.query(sql_get)
    .then(ret => estoque = {total: ret.rows.length, estoque: ret.rows})
    .catch(err => estoque = err.stack)
    return estoque
}

const sql_insert = 
   `insert into estoque(idproduto, qtd, locals, tipomov, observacao) values ($1, $2, $3, $4, $5)`
const postEstoque = async(params) => {
    const {idproduto, qtd, locals, tipomov, observacao} = params
    await db.query(sql_insert, [idproduto, qtd, locals, tipomov, observacao])
}

const sql_delete =
    `delete from estoque WHERE id = $1`
const deleteEstoque = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = 
    `update estoque set
    idproduto = $2, 
    qtd = $3, 
    locals = $4, 
    tipomov = $5, 
    observacao = $6 
    WHERE id = $1`
const putEstoque = async(params) => {
    const {id, idproduto, qtd, locals, tipomov, observacao} = params
    await db.query(sql_updateput, [id, idproduto, qtd, locals, tipomov, observacao])
}

const sql_updatepatch =
    `update estoque set
    `
const patchEstoque = async(params) => {
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if(params.idproduto){
        countParams++
        fields += `idproduto = $${countParams}`
        binds.push(params.idproduto)
    }
    if(params.qtd){
        countParams++
        fields += `qtd = $${countParams}`
        binds.push(params.qtd)
    }
    if(params.locals){
        countParams++
        fields += `locals = $${countParams}`
        binds.push(params.locals)
    }
    if(params.tipomov){
        countParams++
        fields += `tipomov = $${countParams}`
        binds.push(params.tipomov)
    }
    if(params.observacao){
        countParams++
        fields += `observacao = $${countParams}`
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