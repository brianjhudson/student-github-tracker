const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
})

module.exports = knexInstance