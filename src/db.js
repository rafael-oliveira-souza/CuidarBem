const CryptoJS = require("crypto-js");
const secretKey = "321zsds929hahhasdjadaxASDA27162XMASH1233K219233L";

async function connection(){
  // if(global.connection && global.connection.state !== "disconnected"){
  //   return global.connection;
  // }

  const mysql = require("mysql2/promise");

  // create the connection to database
  const connection = await mysql.createConnection({
    host: '162.241.2.84',
    port: '3306',
    user: 'cresc799_root',
    password: 'admin',
    database: 'cresc799_CrescerBem',
    waitForConnections: true,
  });

  // global.connection = connection;
  return connection;
}

async function login(usuario){
  try{
    const conn = await connection();
    const user = await getUsuarioByEmail(usuario.email, conn);
    if(user){
      const senha = decriptarSenha(user.senha);
      conn.end();
      if(senha === `"${usuario.senha}"`){
        return user;
      }else{
        return new ErrorResponse("Usuário ou senha inválido.");
      }
    }else{
      return new ErrorResponse("Usuário não cadastrado.");
    }
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }
}

async function atualizarCliente(cliente){
  try{
    const conn = await connection();
    await conn.query(`UPDATE Cliente SET nome='${cliente.nome}', telefone='${cliente.telefone}', cpf='${cliente.cpf}',
    sobrenome='${cliente.sobrenome}', logradouro='${cliente.logradouro}', estado='${cliente.estado}',
    municipio='${cliente.municipio}', complemento='${cliente.complemento}', cep='${cliente.cep}', numero='${cliente.numero}'
    WHERE id=${cliente.id}`);
    conn.end();
    return cliente;
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }
}

async function getEntidadeById(entidade, id){
  try {
    const conn = await connection();
    const [rows,fields] =  await conn.query(`Select *From ${entidade} WHERE id = ?`, [id]);
    conn.end();
    return rows[0];
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }
}

async function getClienteByCpf(cpf){
  try {
    const conn = await connection();
    const [rows,fields] =  await conn.query(`Select *From Cliente WHERE cpf = ?`, [cpf]);
    conn.end();
    return rows[0];
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }
}

async function criarPacote(pacote){
  try{
    const conn = await connection();
    const resp = await conn.query(`INSERT INTO Locacao (pct_desconto, qtd_dias) VALUES(${pacote.porcentagemDesconto}, ${pacote.quantidadeDias})`);
    const [rows,fields] = await conn.query(`Select *From Locacao WHERE qtd_dias = ?`, [pacote.quantidadeDias]);
    conn.end();
    pacote.id = resp[0].insertId;

    return rows[0];
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }

}

async function criarCategoria(categoria){
  try{
    const conn = await connection();
    const resp = await conn.query(`INSERT INTO Categoria (nome) VALUES('${categoria.nome}')`);
    conn.end();
    categoria.id = resp[0].insertId;

    return categoria;
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }

}

async function criarFaixa(faixa){
  try{
    const conn = await connection();
    const resp = await conn.query(`INSERT INTO Faixa (nome) VALUES('${faixa.nome}')`);
    conn.end();
    faixa.id = resp[0].insertId;

    return faixa;
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }

}


async function criarProduto(produto){
  try{
    const conn = await connection();
    const resp = await conn.query(`INSERT INTO Produto
    (nome, descricao, estoque, quantidade, locacao, categoria, situacao, valor, avaliacao, faixa_etaria, imagem)
    VALUES('${produto.nome}', '${produto.descricao}', ${produto.estoque}, ${produto.quantidade},
    ${produto.pacote}, ${produto.categoria}, ${produto.situacao}, ${produto.valor}, ${produto.avaliacao},
    ${produto.faixaEtaria}, '${produto.imagem}') `);
    conn.end();
    produto.id = resp[0].insertId;

    return produto;
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }

}

async function criarUsuario(usuario){
  try{
    const conn = await connection();
    const row = await getUsuarioByEmail(usuario.email, conn);
    if(!row){
      usuario.senha = encriptarSenha(usuario.senha);
      await conn.query(`INSERT INTO Usuario (email, senha) VALUES('${usuario.email}', '${usuario.senha}')`);
      const user = await getUsuarioByEmail(usuario.email, conn);

      await conn.query(`INSERT INTO Cliente (id, nome, telefone, cpf, sobrenome, logradouro, estado, municipio, complemento, cep)
      VALUES(${user.id}, '', '', '', '', '', '', '', '', '')`);
      conn.end();

      return user;
    }else{
      return new ErrorResponse("Email já cadastrado.");
    }
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }
}

async function getUsuarioByEmail(email, conn){
  try {
    if(!conn){
      conn = await connection();
    }
    const [rows,fields] =  await conn.query(`Select *From Usuario WHERE email = ?`, [email]);
    return rows[0];
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }
}

async function getEntidade(entidade){
  try {
    const conn = await connection();

    const [rows,fields] =  await conn.query(`Select *From ${entidade} Order by id`);
    conn.end();
    return rows;
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }
}

async function removeEntidadeById(entidade, id){
  try {
    const entity = await getEntidadeById(entidade, id)
    if(entity){
      const conn = await connection();
      const [rows,fields] =  await conn.query(`Delete From ${entidade} Where id = ?`, [id]);
      conn.end();
      return;
    }else{
      return new ErrorResponse("Entidade não encontrada");
    }
  }
  catch (e) {
    return new ErrorResponse(e["message"]);
  }
}


function encriptarSenha(senha) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(senha),
    secretKey
  ).toString();
}

function decriptarSenha(senha) {
  const bytes  = CryptoJS.AES.decrypt(senha, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const ErrorResponse = function(msg) {
  this.mensagem = msg;
  this.status = 500;
};

module.exports = {connection, getEntidade, removeEntidadeById, getEntidadeById, criarFaixa, criarUsuario, criarPacote, criarProduto, criarCategoria, login, atualizarCliente}
