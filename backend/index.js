
const express = require('express')
var cors = require('Cors')
const connectWithDB = require('./db');
connectWithDB();
const app = express()
const port = 5000
app.use(express.json())

app.use(cors())
app.use(express.json())



// link route folder
app.use('/api/sami',require('./routes/auth'));
app.use('/api/harry',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
