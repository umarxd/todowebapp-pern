const express = require("express");
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
//const pool = require('./db')
dotenv.config()

const app = express()

//middleware
app.use(cors())
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    
}

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/todos', require('./routes/todoRoutes'))

const PORT = process.env.PORT || 5000


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}.`)
})