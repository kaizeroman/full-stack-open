require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.URI

async function connectDB() {
    try{
        console.log("Connecting to database...")
        await mongoose.connect(url)
        console.log("Database Connected")
    }catch(err){
        console.log("Error connecting to database: ", err)
    }
}

connectDB()

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)