const db = require('../configs/pg')

const getCliente = async () => {
    const sql_get = `select * from cliente`
    let cliente = {}
    await db.query(sql_get)
    .then(ret => cliente = {total: ret.rows.length, cliente: ret.rows})
    .catch(err => cliente = err.stack)
    return cliente
}

const postCliente = async(params) => {
    const sql_insert = `insert into cliente(nome,cpfcnpj,telefone,endereco) values ($1,$2, $3, $4)`
    const {nome, cpfcnpj, telefone, endereco} = params
    await db.query(sql_insert, [nome, cpfcnpj, telefone, endereco])
}

const sql_delete = `delete from cliente WHERE id = $1`
const deleteCliente = async(params) => {
    const { id } = params
    await db.query(sql_delete, [id])
}

const sql_updateput = `update cliente set 
        nome = $2, 
        cpfcnpj = $3, 
        telefone = $4, 
        endereco = $5 
    WHERE id = $1`
const putCliente = async(params) => {
    const {id, nome, cpfcnpj, telefone, endereco} = params
    await db.query(sql_updateput, [id, nome, cpfcnpj, telefone, endereco])
}

const sql_updatepatch =
    `update cliente set
    `
const patchCliente = async(params) => {
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
module.exports.postCliente = postCliente
module.exports.getCliente = getCliente
module.exports.deleteCliente = deleteCliente
module.exports.putCliente = putCliente
module.exports.patchCliente = patchCliente