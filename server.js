const express = require('express')
const bodyParser = require('body-parser')
const fs = require ('node:fs')

// const data = [
//   {String: 'Testing Data', Integer: '12', Float: '1.45', Date: '12 Desember 2017'},
//   {String: 'Coba Lagi', Integer: '12', Float: '1.45', Date: '12 Desember 2017'},
//   {String: 'Testing Data', Integer: '12', Float: '1.45', Date: '12 Desember 2017'},
// ]


const app = express()

let rawdata = fs.readFileSync('data.json');
let server = JSON.parse(rawdata)

const port = 3000

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', {server})
})

app.get('/Add', (req, res) => {
  res.render('add')
  })

app.post('/Add', (req, res) => {
  console.log(server)
  server.push({"id": server.length + 1, "String": req.body.String, "Integer": req.body.Integer, "Float": req.body.Float, "Date": req.body.Date || "Kosong", "Boolean": req.body.Boolean})
  fs.writeFileSync('data.json', JSON.stringify(server,null, 4))
  res.redirect('/')
})

  app.get('/hapus/:id', (req,res) =>{
    const id = req.params.id
    server.splice(id, 1)
    fs.writeFileSync('data.json', JSON.stringify(server,null, 4))
    res.redirect('/')
  })

  app.get('/ubah/:id', (req, res) => {
    const id = req.params.id
    res.render('edit', {item : server[id]})
  })

  app.post('/ubah/:id', (req, res) => {
    const id = req.params.id
    server[id] = ({"id": parseInt(id) + 1, "String": req.body.String, "Integer": req.body.Integer, "Float": req.body.Float, "Date": req.body.Date || "Kosong", "Boolean": req.body.Boolean})
    fs.writeFileSync('data.json', JSON.stringify(server, null, 4))
    res.redirect('/')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

