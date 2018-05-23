
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', t => {
    t.increments('id').unsigned().primary();
    t.string('userName').notNull();
    t.string('address').notNull();
    t.string('description').notNull();
    t.float('latitude').notNullable();
  	t.float('longitude').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  	t.timestamp('updated_at').defaultTo(knex.fn.now());
  } )
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
