
exports.up = function(knex, Promise) {
  return knex.schema.createTable('friends', t => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').references('id').inTable('login_user').notNullable();
    t.integer('friend_id').references('id').inTable('login_user').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  	t.timestamp('updated_at').defaultTo(knex.fn.now());
  } )
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('friends');
};
