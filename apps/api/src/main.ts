import { post }  from './connectToUsers/postgraphile'
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const  PORT  = 3333

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(post)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

