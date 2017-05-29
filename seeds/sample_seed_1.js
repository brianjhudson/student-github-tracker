
exports.seed = function(knex, Promise) {
  return knex('mentor').del()
    .then(function () {
      return knex('mentor').insert([{
        id: 1, 
        // Fill in the values for the the following three properties
        first_name: '', 
        last_name: '', 
        github_account_name: '', 
        created_at: new Date(), 
        updated_at: new Date()
      }]);
    });
};
