import { post }  from './connectToUsers/postgraphile'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

const  PORT  = 3333

app.use(cors({origin: ['http://localhost:4200']}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(post)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

