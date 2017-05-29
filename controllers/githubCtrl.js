const axios = require('axios');
const knex = require('../knex')

module.exports = {
    checkUserEventsByUsername: checkUserEvents,
    checkEventsForAllUsers
}

function checkUserEvents(username) {
    return axios.get(`https://api.github.com/users/${username}/events`).then(response => {
        console.log(response.data)
    })
}

function checkEventsForAllUsers() {
    knex('student').then(results => {
        console.log(results)
    })
}
