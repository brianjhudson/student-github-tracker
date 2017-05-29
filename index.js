require('dotenv').config()

const express = require('express')
const session = require('express-session')
const cors = require('cors')
const {json} = require('body-parser')
const {CronJob} = require('cron')
const githubCtrl = require('./controllers/githubCtrl')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false 
}))

githubCtrl.checkEventsForAllUsers()

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})