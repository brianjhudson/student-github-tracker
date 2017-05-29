const express = require('express')
const session = require('express-session')
const cors = require('cors')
const {json} = require('body-parser')
const {CronJob} = require('cron')
const githubCtrl = require('./controllers/githubCtrl')
require('dotenv').config()

const knex = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
})
const app = express()

app.set('port', process.env.PORT || 3000)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false 
}))

githubCtrl.checkUserEvents('vattythehut')
app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})