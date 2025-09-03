const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Provide password, name, and number respectively as arguments if you want to add in phonebook.')
    console.log('Provide password only as argument if you want to display phonebook.')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://kaizer_fullstack:${password}@cluster0.pwh2h23.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

async function main(){
    try {
        await mongoose.connect(url)

        if(!name && !number){
            const people = await Person.find({})
            console.log("phonebook:")
            people.forEach(person => console.log(person.name, person.number))
        }else if(name && number){
            const person = new Person({
                name: name,
                number: number
            })
            await person.save()
            console.log("added", name, "number", number, "to phonebook")
        }else{
            throw new Error("Invalid Arguments")
        }
    }catch (err) {
        console.log(err.message)
    }finally{
        await mongoose.connection.close()
    }
}

main()