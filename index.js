require('dotenv').config()

const express = require('express')
const session = require('express-session')
const cors = require('cors')
const {json} = require('body-parser')
const CronJob = require('cron').CronJob
const githubCtrl = require('./controllers/githubCtrl')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false 
}))

githubCtrl.checkEvents()

new CronJob('*/300 * * * * *', () => {
    console.log("Checking Github API...")
    githubCtrl.checkEvents()
}, true, 'America/Chicago')

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})