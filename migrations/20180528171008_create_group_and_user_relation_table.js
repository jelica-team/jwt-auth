
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_users', t => {
    t.increments('id').unsigned().primary();
    t.integer('group_id').references('id').inTable('groups').notNullable();
    t.integer('user_id').references('id').inTable('login_user').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  	t.timestamp('updated_at').defaultTo(knex.fn.now());
  } )
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('group_users');
};
