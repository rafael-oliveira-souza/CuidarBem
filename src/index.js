// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors({ origin: 'https://crescerdf.com/'}));

const db = require("./db");

app.delete('/produto/excluir', async(req, res) =>{
  const id = req.query.id;
  const todos = await db.removeEntidadeById('Produto', id);
  return Response(todos, res);
});

app.get('/produto/todos', async(req, res) =>{
    const todos = await db.getEntidade('Produto');

    return Response(todos, res);
});

app.post('/produto', async(req, res) =>{
  const user = await db.criarProduto(req.body);

  return Response(user, res);
});

app.get('/pacote/todos', async(req, res) =>{
  const todos = await db.getEntidade('Locacao');
  return Response(todos, res);
});

app.delete('/pacote/excluir', async(req, res) =>{
  const id = req.query.id;
  const todos = await db.removeEntidadeById('Pacote', id);
  return Response(todos, res);
});

app.post('/pacote', async(req, res) =>{
  const user = await db.criarPacote(req.body);

  return Response(user, res);
});

app.get('/faixa/todos', async(req, res) =>{
  const todos = await db.getEntidade('Faixa');
  return Response(todos, res);
});

app.delete('/faixa/excluir', async(req, res) =>{
  const id = req.query.id;
  const todos = await db.removeEntidadeById('Faixa', id);
  return Response(todos, res);
});

app.post('/faixa', async(req, res) =>{
  const user = await db.criarFaixa(req.body);

  return Response(user, res);
});

app.get('/categoria/todos', async(req, res) =>{
  const todos = await db.getEntidade('Categoria');
  return Response(todos, res);
});

app.delete('/categoria/excluir', async(req, res) =>{
  const id = req.query.id;
  const todos = await db.removeEntidadeById('Categoria', id);
  return Response(todos, res);
});

app.post('/categoria', async(req, res) =>{
  const user = await db.criarCategoria(req.body);

  return Response(user, res);
});

app.get('/categoria', async(req, res) =>{
  const id = req.query.id;
  const todos = await db.getEntidadeById('Categoria', id);
  return Response(todos, res);
});

app.get('/cliente/todos', async(req, res) =>{
  const todos = await db.getEntidade('Cliente');
  return Response(todos, res);
});

app.delete('/cliente/excluir', async(req, res) =>{
  const id = req.query.id;
  const todos = await db.removeEntidadeById('Cliente', id);
  return Response(todos, res);
});

app.get('/cliente', async(req, res) =>{
  const id = req.query.id;
  const todos = await db.getEntidadeById('Cliente', id);
  return Response(todos, res);
});

app.post('/cliente', async(req, res) =>{
  const user = await db.criarCliente(req.body);

  return Response(user, res);
});

app.put('/cliente/atualizar', async(req, res) =>{
  const user = await db.atualizarCliente(req.body);

  return Response(user, res);
});

app.get('/usuario/todos', async(req, res) =>{
  const todos = await db.getEntidade('Usuario');
  return Response(todos, res);
});

app.delete('/usuario/excluir', async(req, res) =>{
  const id = req.query.id;
  const todos = await db.removeEntidadeById('Usuario', id);
  return Response(todos, res);
});

app.post('/usuario', async(req, res) =>{
  const user = await db.criarUsuario(req.body);

  return Response(user, res);
});

app.post('/usuario/login', async(req, res) =>{
  const user = await db.login(req.body);

  return Response(user, res);
});

app.post('/mercado-pago', async(req, res) => {
  // Configura credenciais

  // let preference = {
  //     items: [
  //       {
  //         title: 'Meu produto',
  //         unit_price: 100,
  //         quantity: 1,
  //       }
  //     ]
  // };

  // console.log(preference)
  // console.log(JSON.stringify(preference))

  // mercadopago.configure({
  //   access_token: 'TEST-7778485648018849-033021-620875813a4ef7e99485798a12728185-410460126'
  // });


  // return await mercadopago.preferences.create(preference);
  // .then(function(response){
  // // Este valor substituirá a string "<%= global.id %>" no seu HTML
  //   global.id = response.body.id;
  // }).catch(function(error){
  //   console.log(error);
  // });
  const mercadopago = require ('mercadopago');

  // Add Your credentials
  mercadopago.configure({
    access_token: 'PROD_ACCESS_TOKEN'
    //   access_token: 'TEST-7778485648018849-033021-620875813a4ef7e99485798a12728185-410460126'
  });

  // Create a preference object
  let preference = {
    items: [
      {
        title: 'My Item',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };

  mercadopago.preferences.create(preference)
  .then(function(response){
  // This value replaces the String "<%= global.id %>" in your HTML
    global.id = response.body.id;
  }).catch(function(error){
    console.log(error);
  });
});


function Response(object, res){
  if(object && object["status"] && object["status"] != 200){
    return res.status(object["status"]).send(object);
  }else{
    res.json(object);
  }
}


console.log("Iniciando Servidor.....");
app.listen(3300);
console.log("Servidor iniciado");

