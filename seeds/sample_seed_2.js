
exports.seed = function(knex, Promise) {
  return knex('student').del()
    .then(function () {
      return knex('student').insert([
        // Insert one object for each student; don't forget to increment the id property on subsequent students.
        {
          id: 1, 
          first_name: '', 
          last_name: '', 
          github_account_name: '',
          mentor_id: 1, 
          created_at: new Date(), 
          updated_at: new Date()
        },
      ]);
    });
};
