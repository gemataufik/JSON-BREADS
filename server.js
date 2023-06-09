const express = require('express')
const bodyParser = require('body-parser')
const fs = require ('node:fs')


const app = express()

let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata)

const port = 3000

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', {data})
})

app.get('/Add', (req, res) => {
  res.render('add')
  })

app.post('/Add', (req, res) => {
 
  data.push({"id": data.length + 1, "String": req.body.String, "Integer": req.body.Integer, "Float": req.body.Float, "Date": req.body.Date || "Kosong", "Boolean": req.body.Boolean})
  fs.writeFileSync('data.json', JSON.stringify(data,null, 4))
  res.redirect('/')
})

  app.get('/hapus/:id', (req,res) =>{
    const id = req.params.id
    data.splice(id, 1)
    fs.writeFileSync('data.json', JSON.stringify(data,null, 4))
    res.redirect('/')
  })

  app.get('/ubah/:id', (req, res) => {
    const id = req.params.id
    res.render('edit', {item : data[id]})
  })

  app.post('/ubah/:id', (req, res) => {
    const id = req.params.id
    data[id] = ({"id": parseInt(id) + 1, "String": req.body.String, "Integer": req.body.Integer, "Float": req.body.Float, "Date": req.body.Date || "Kosong", "Boolean": req.body.Boolean})
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
    res.redirect('/')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

