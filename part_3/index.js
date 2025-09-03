require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))

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


app.get('/', (req, res) => res.send("Phonebook is running!"))
app.get('/api/persons', async (request, response) => {
    try{
        const people = await Person.find({})
        response.json(people)
    }catch (err) {
        console.log("error fetching data", err)
    }
})

app.get('/info', async (request, response) => {
    try{
        const length = await Person.countDocuments({})
        response.send(
            `<p>Phonebook has info for ${length} people</p>
        <p>${new Date()}</p>`
        )
    }catch(err) {
        console.log("Error fetching length of data",err)
    }
})

app.get('/api/persons/:id', async (request, response) => {
    try{
       const id = request.params.id
        const person = await Person.findById(id)
        response.json(person)
    } catch(err) {
        console.log("Error getting person with id", id, err)
    }
})

app.delete('/api/persons/:id', async (request, response) => {
    try {
        const id = request.params.id
        await Person.findByIdAndDelete(id)
        response.status(204).end()
    }catch(err) {
        console.log("Error deleting person with id", id, err)
    }
})

app.post('/api/persons', async (request, response) => {
    try{
        const body = request.body

        if(!body.name || !body.number) {
            return response.status(400).json({
                error: "name or number is missing"
            })
        }

        const nameExists = await Person.findOne({name: body.name})
        if (nameExists) {
            return response.status(400).json({
                error: `${body.name} already exists`
            })
        }

        const person = new Person({
            name: body.name,
            number: body.number,
        })
        
        const savedPerson = await person.save()
        response.json(savedPerson)
    }catch (err){
        console.log("Error inserting data", err)
        response.status(500).json({error: "Internal Server Error"})
    }
})

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