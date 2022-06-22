const db = require('../configs/pg')

const sql_get = 
 `select id, nome, cpfcnpj, telefone, endereco from fornecedor`
const getFornecedor = async () => {
    let fornecedor = {}
    await db.query(sql_get)
    .then(ret => fornecedor = {total: ret.rows.length, fornecedor: ret.rows})
    .catch(err => fornecedor = err.stack)
    return fornecedor
}

const sql_insert = 
   `insert into fornecedor(id,nome,cpfcnpj,telefone,endereco) values ($1, $2, $3, $4, $5)`
const postFornecedor = async(params) => {
    const { id, nome, cpfcnpj, telefone, endereco} = params
    await db.query(sql_insert, [id, nome, cpfcnpj, telefone, endereco])
}

const sql_delete =
    `delete from fornecedor WHERE id = $1`
const deleteFornecedor = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = 
    `update fornecedor set 
    nome = $2, 
    cpfcnpj = $3, 
    telefone = $4, 
    endereco = $5 
    WHERE id = $1`
const putFornecedor = async(params) => {
    const {id, nome, cpfcnpj, telefone, endereco} = params
    await db.query(sql_updateput, [id, nome, cpfcnpj, telefone, endereco])
}

const sql_updatepatch =
    `update fornecedor set
    `
const patchFornecedor = async(params) => {
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if(params.nome){
        countParams++
        fields += `nome = $${countParams}`
        binds.push(params.nome)
    }
    if(params.cpfcnpj){
        countParams++
        fields += `cpfcnpj = $${countParams}`
        binds.push(params.cpfcnpj)
    }
    if(params.telefone){
        countParams++
        fields += `telefone = $${countParams}`
        binds.push(params.telefone)
    }
    if(params.endereco){
        countParams++
        fields += `endereco = $${countParams}`
        binds.push(params.endereco)
    }
    let sql = sql_updatepatch + fields + ' where id = $1 '
    return await db.query(sql, binds)
}
module.exports.postFornecedor = postFornecedor
module.exports.getFornecedor = getFornecedor
module.exports.deleteFornecedor = deleteFornecedor
module.exports.putFornecedor = putFornecedor
module.exports.patchFornecedor = patchFornecedor