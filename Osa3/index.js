const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())

app.use(morgan(':method :status :date :content'))
morgan.token('content', (req,res) => req.body.name + " " +  req.body.number)


console.log('Starting...')

let persons = [
    {
      id: 1,
      name: "Arto hellas",
      number: "1234"
    },
    {
        id: 2,
        name: "Mauri Maki",
        number: "123467"
    },
    {
        id: 3,
        name: "Jakke Joku",
        number: "123414142141"
    }
  ]

  app.get('/', (req, res) => {
res.send('<h1>Hello World!</h1>')
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    let newDate = new Date().toLocaleString() + ''
    res.send(`<h1>Phonebook has info for ${persons.length} persons</h1>
    <h2>${newDate}</h2>`)
      })

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    if(!body.name || !body.number){
      return response.status(400).json({
        error: 'missing name or number'
      })
    }
    
    const person = {
        id: Math.floor(Math.random()*10000)+1,
        name: body.name,
        number: body.number
    }

    if(persons.filter(e => e.name === body.name).length >0){
      return response.status(406).json({
        error: 'name already exists'
      }) 
    }else{
      persons.push(person)
      response.json(person)
    }
    return response.status(404).end()

    
  })


  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  