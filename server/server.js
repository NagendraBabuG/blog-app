const express = require('express')
//import express from 'express'
const bodyparser = require('body-parser')
//import bodyParser  from 'body-parser'
const mongoose = require('mongoose')
const cors = require('cors')
//import cors from 'cors'
//import {Employee, Admin} from './config.js'
//const {Employee, Admin}  = require('./config.js')
const {Employee} = require('./db/firebaseUtil')
const app = express()
app.use(express.json())
// app.use(bodyparser.json({ limit: "30mb", extended: true }))
// app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
//                     'mongodb+srv://nagendrababug:gnb0009@cluster0.p3y6zdp.mongodb.net/?retryWrites=true&w=majority'

app.get('/', (req, res) => {
    //res.redirect()
    //  console.log('hello')
    res.send('<h1>hello<h1>')
});

app.post('/post', (req, res) => {
    res.redirect('/')
});

app.get('/getEmployees', async (req, res) => {
    const snapshot = await Employee.get();
    const list = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    res.send(list);
});
app.post('updateEmployee', async (req, res) => {
    const id = req.body.id;
    delete req.body.id;
    await Employee.doc(id).update(req.body);
})
app.post('/create', async (req, res) => {
    console.log(req)
    console.log(req.body)
    if(!req.body) {
        res.send({msg : "Data is undefined!!!"})
        return;
    }
    const data = req.body;
    await Employee.add({data});
    console.log("Data of Employees", data);
    res.send({msg : "Employee added"});
})
//const CONNECTION_URL = 'mongodb+srv://nagendrababug:gnb0009@cluster0.p3y6zdp.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000;
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on Port : ${PORT}`)
//     })
// }).catch((error) => console.log(error.message))

// mongoose.set('useFindAndModify', false)a











app.listen(PORT, ()=> {
    console.log(`Server is running on Port ${PORT}`)
})