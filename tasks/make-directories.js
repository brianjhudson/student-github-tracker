require('dotenv').config()
const knex = require('../knex')
const exec = require('child_process').exec

if (process.env.MENTEES_ONLY === 'true') {
   knex('student')
   .join('mentor', 'mentor.id', '=', 'student.mentor_id')
   .where({'mentor.github_account_name': process.env.GITHUB_ACCOUNT_NAME})
   .select('student.github_account_name')
   .then(results => {
      createDirectories(results)
   })
} else {
   knex('student').select('github_account_name')
   .then(results => {
      createDirectories(results)
   })
}

function createDirectories(results) {
   for (result of results) {
      exec('cd ' + process.env.BASE_PATH + ' && mkdir ' + result.github_account_name, (err, stdErr, stdOut) => {
         if (err || stdErr) {
            console.log(err)
            console.log(stdErr)
         } else {
            console.log('Directory Created')
         }
      })
   }
}
