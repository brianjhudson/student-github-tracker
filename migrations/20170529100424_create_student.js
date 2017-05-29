
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('student', table => {
      table.increments()
      table.string('first_name')
      table.string('last_name')
      table.string('github_account_name')
      table.integer('mentor_id').unsigned()
      table.timestamps()
      table.unique('github_account_name')
      table.foreign('mentor_id').references('mentor.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('student')  
};
