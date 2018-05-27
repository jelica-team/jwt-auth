//build
exports.up = function(knex, Promise) {
  return knex.schema.createTable('login_user' , t =>{
      t.increments('id').unsigned().primary();
      t.string('login').notNull();
      t.string('email').notNull();
      t.string('password_digest').notNull();
  });
};
//destroy
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('login_user');
};
