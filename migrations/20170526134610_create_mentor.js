
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('mentor', table => {
      table.increments()
      table.string('first_name')
      table.string('last_name')
      table.string('github_account_name')
      table.timestamps()
      table.unique('github_account_name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('mentor')
};