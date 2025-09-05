require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

app.use(morgan((tokens, req, res) =>{
    let log = [
        tokens.method(req, res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res, 'content-length'),
        '-',
        tokens['response-time'](req,res),
        'ms',
    ].join(' ')

    if(req.method === 'POST' && req.body){
        log += ` name: ${req.body.name} number: ${req.body.number}`
    }
    console.log(log)
    return null
}))

const asyncHandler = fn => (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch(next)
}

app.get('/', (req, res) => res.send("Phonebook is running!"))

app.get('/api/persons', asyncHandler(async (request, response) => {
    const people = await Person.find({})
    response.json(people)
}))

app.get('/info', asyncHandler(async (request, response) => {
    const length = await Person.countDocuments({})
    response.send(`
        <p>Phonebook has info for ${length} people</p>
        <p>${new Date()}</p>
    `)
}))

app.get('/api/persons/:id', asyncHandler( async (request, response) => {
    const id = request.params.id
    const person = await Person.findById(id)
    if(!person){
        return response.status(404).json({error: `Can't find resource with id ${id}`})
    }
    response.json(person)
}))

app.delete('/api/persons/:id', asyncHandler(async (request, response) => {
    const id = request.params.id
    const deleted = await Person.findByIdAndDelete(id)
    if(!deleted) {
        response.status(404).json({error: `Can't find resource with id ${id}`})
    }
    response.status(204).end()
}))

app.post('/api/persons', asyncHandler(async (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: "name or number is missing"
        })
    }

    const nameExists = await Person.findOne({name: body.name})
    if (nameExists) {
        return response.status(409).json({
            error: `${body.name} already exists`
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
        
    const savedPerson = await person.save()
    response.status(201).json(savedPerson)
}))

app.put('/api/persons/:id', asyncHandler( async (req, res) => {
    const {id} = req.params
    const {number} = req.body

    const person = await Person.findByIdAndUpdate(
        id,
        { number } ,
        { new: true, runValidators: true, context: 'query' }
    )
    if(!person) {
        return res.status(404).json({error: `Can't find resource with id ${id}`})
    }
    return res.json(person)
}))

const unknownEndpoint = (req, res) => {
    res.status(404).json({error:"Unknown Endpoint"})
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    if(err.name === "CastError") {
        return res.status(400).json({error: "Malformatted ID"})
    }else if(err.name === "ValidationError") {
        return res.status(400).json({error: err.message})
    }
    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

async function shutdown() {
    console.log("Closing DB connection...")
    await mongoose.connection.close()
    server.close(() => process.exit(0))
}
// Close connection
process.on('SIGINT', () => shutdown())
process.on('SIGTERM', () => shutdown())