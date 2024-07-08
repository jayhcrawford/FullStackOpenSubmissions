require('dotenv').config()
const mongoose = require('mongoose')

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]

const url = `mongodb+srv://jayhcrawford:${password}@clusterfudge.qr6ebha.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFudge`



const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Contact = mongoose.model('Contact', contactSchema)



//this case exists if user doesn't enter db password
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

//this case exists if user enters password and no arguments--meaning, no submission to database. returns full list of contacts in db.
if (process.argv.length===3) {

  mongoose.connect(url).then(result => {
    console.log(result)
  }).catch((error) => {
    console.log('incorrect password')
    console.log(error)
    process.exit(1)
  }
  )

  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
  })

}

//this case exists if arguments are greater than 3--meaning a contact is being submitted to db.
if (process.argv.length>3) {

  mongoose.set('strictQuery',false)

  mongoose.connect(url)

  const contact = new Contact({
    name: contactName,
    number: contactNumber,
  })

  contact.save().then(result => {
    console.log(result)
    console.log('contact saved!')
    mongoose.connection.close()
  })
}


