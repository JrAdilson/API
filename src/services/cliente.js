const db = require('../configs/pg')

const sql_get = 
 `select id, nome, cpfcnpj, telefone, endereco from clientes`
const getClientes = async () => {
    let cliente = {}
    await db.query(sql_get)
    .then(ret => cliente = {total: ret.rows.length, clientes: ret.rows})
    .catch(err => cliente = err.stack)
    return cliente
}

const sql_insert = 
   `insert into clientes(id,nome,cpfcnpj,telefone,endereco) values ($1, $2, $3, $4, $5)`
const postClientes = async(params) => {
    const { id, nome, cpfcnpj, telefone, endereco} = params
    await db.query(sql_insert, [id, nome, cpfcnpj, telefone, endereco])
}

const sql_delete =
    `delete from clientes WHERE id = $1`
const deleteClientes = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = 
    `update clientes set 
        nome = $2, 
        cpfcnpj = $3, 
        telefone = $4, 
        endereco = $5 
    WHERE id = $1`
const putClientes = async(params) => {
    const {id, nome, cpfcnpj, telefone, endereco} = params
    await db.query(sql_updateput, [id, nome, cpfcnpj, telefone, endereco])
}

const sql_updatepatch =
    `update clientes set
    `
const patchClientes = async(params) => {
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
module.exports.postClientes = postClientes
module.exports.getClientes = getClientes
module.exports.deleteClientes = deleteClientes
module.exports.putClientes = putClientes
module.exports.patchClientes = patchClientes