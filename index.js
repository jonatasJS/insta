const Instagram = require('instagram-web-api')
const express = require('express')
const app = express()

app.get('/', (req, res) => {

  let body = `
    Nome: <input type="text" placeholder="Ex.: _jonatas.js" id="name">
    Senha: <input type="password" id="senha">
    <button id="btn">Ir</button>
    <script>
      document.getElementById('btn').addEventListener('click', () => {
        const name = document.getElementById('name').value
        const senha = document.getElementById('senha').value
    
        window.location.href = '/result/'+name+'?senha='+senha
      })
    </script>
  `

  res.send(body)
})

app.get('/result/:name', async (req, res) => {
  const username = await req.params.name
  const password = await req.query.senha

  console.log(username)
  console.log(password)

  const client = await new Instagram({ username, password })
 
  client
    .login()
    .then(() => {
      client
        .getProfile()
        .then(e => {
          console.log(e)
          res.send(`
          <p>Name: ${e.first_name}</p>
          <p>Email: ${e.email}</p>
          <p>Telefone: ${e.phone_number}</p>
          <p>Sexo: ${e.gender == 1 ? 'Masculino' : 'Feminino'}</p>
          <p>Nome de usuario: ${e.username}</p>
          <p>Bio: ${e.biography}</p>
          <p>Nome de usuario passado: ${e.trusted_username}</p>
        `)
        })
    })
})

// 


app.listen(8080)