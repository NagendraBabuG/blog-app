const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(bodyparser.json({limit: "30mb", extended : true}))
app.use(bodyparser.urlencoded({limit : "30mb", extended : true}))
app.use(cors())
//                     'mongodb+srv://nagendrababug:gnb0009@cluster0.p3y6zdp.mongodb.net/?retryWrites=true&w=majority'

const CONNECTION_URL = 'mongodb+srv://nagendrababug:gnb0009@cluster0.p3y6zdp.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000;
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on Port : ${PORT}`)
    })
}).catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)