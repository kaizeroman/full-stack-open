require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))

app.use(morgan((tokens, req, res) =>{
    const log = [
        tokens.method(req, res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res, 'content-length'),
        '-',
        tokens['response-time'](req,res),
        'ms',
    ].join(' ')
    console.log(log)
    return null
}))


app.get('/', (req, res) => res.send("Phonebook is running!"))
app.get('/api/persons', async (request, response) => {
    try{
        const persons = await Person.find({})
        response.json(persons)
    }catch (err) {
        console.log("error fetching data", err)
    }finally{
        await mongoose.connection.close()
    }
})

app.get('/info', (request, response) => {
    response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
)})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id )
    if(person) {
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: "name or number is missing"
        })
    }

    const nameExists = persons.find(person => person.name === body.name)
    if (nameExists) {
        return response.status(400).json({
            error: `${body.name} already exists`
        })
    }

    const person = {
        id: String(Math.floor(Math.random()*100000000)),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})