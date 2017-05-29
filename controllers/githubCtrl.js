const axios = require('axios');

module.exports = {
    checkUserEvents,
}

function checkUserEvents(username) {
    return axios.get(`https://api.github.com/users/${username}/events`).then(response => {
        console.log(response.data)
    })

}
