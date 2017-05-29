
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('student_project', table => {
      table.increments()
      table.integer('student_id').unsigned()
      table.string('project_name')
      table.string('project_url')
      table.string('last_commit')
      table.dateTime('last_commit_date')
      table.timestamps()
      table.unique('project_url')
      table.foreign('student_id').references('student.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('student_project')
};
