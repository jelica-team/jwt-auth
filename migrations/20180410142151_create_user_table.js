//build
exports.up = function(knex, Promise) {
  return knex.schema.createTable('login_user' , t =>{
      t.increments('id').unsigned().primary();
      t.string('login').notNullable();
      t.string('email').notNullable();
      t.string('password_digest').notNullable();
  });
};
//destroy
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('login_user');
};
