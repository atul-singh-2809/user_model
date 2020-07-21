const express = require('express');
require('custom-env').env('staging');

const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser= require('body-parser')
const AuthRoute =require('./routes/auth')

const port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database Connected');
});
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err)=>{
    console.log(err.message)
})


mongoose.connection.on('disconnected', ()=>{
    console.log('Disconnected')
})

// process .on('SIGINT', async ()=>{
//     await mongoose.connection.close()
//     process.exit(0)
// })
app.get('/', (req, res) => {
    res.send('Hello World');
});
// const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.listen(port, () => console.log(`Server running on port ${port} `));

app.use('/api',AuthRoute)
