const axios = require('axios');
const knex = require('../knex')
const _ = require('underscore')
const exec = require('child_process').exec;


module.exports = {
    checkUserEventsByUsername: checkUserEvents,
    checkEventsForAllUsers
}

function checkUserEvents(studentId, username) {
    return axios.get(`https://api.github.com/users/${username}/events`, {
        headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'User-Agent': process.env.GITHUB_ACCOUNT_NAME}
    })
    // return only data
    .then(response => response.data)
    // return only user's repos (not devmountain's)
    .then(results => results.filter(result => result.repo.url.toLowerCase().includes(username.toLowerCase())))
    // return only latest commit
    .then(results => _.chain(results)
        .groupBy(result => result.repo.id)
        .map(result => result.sort((a, b) => a.created_at - b.created_at)[0])
        .values()
        .value()
    )
    // return formatted object with only relevant data
    .then(results => results.map(result => ({
        username: username,
        student_id: studentId,
        project_name: result.repo.name,
        project_url: result.repo.url,
        last_commit: result.id,
        last_commit_date: result.created_at
    })))
}

function updateDatabase(commit) {
    const username = commit.username.toLowerCase()
    delete commit.username
    return knex('student_project').where({
        project_url: commit.project_url 
    })
    .then(result => {
        const path = process.env.BASE_PATH + username
        const url = commit.project_url.replace('api.github.com/repos', 'github.com')

        if (!result.length) {
            return knex('student_project')
            .insert(commit)
            .then(results => {
                exec('cd ' + path + ' && git clone ' + url, (err, stderr, stdout) => {
                    console.log("Error: ", err)
                    console.log("St Err: ", stderr)
                    console.log("St Out: ", stdout)
                })
            })
        } else if (result[0].last_commit_date < commit.last_commit_date) {
            path += '/' + commit.project_name
            console.log(result)
            return knex('student_project')
            .update({last_commit_date: commit.last_commit_date})
            .where({project_url: commit.project_url})
            .then(results => {
                exec('cd ' + path + '&& git pull', (err, stderr, stdout) => {
                    console.log("Error: ", err)
                    console.log("St Err: ", stderr)
                    console.log("St Out: ", stdout)
                })                
            })
        } else {

        }
    })
}

function checkEventsForAllUsers() {
    knex('student')
    .select('id', 'github_account_name')
    .map(result => 
        checkUserEvents(result.id, result.github_account_name)
        .then(results => results.map(commit => {
            updateDatabase(commit)
        }))
    )
}
