
exports.up = function (knex) {
  return knex.schema.createTable('groups', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name').notNullable();
    t.string('address').notNullable();
    t.string('description').notNullable();
    t.float('latitude').notNullable();
    t.float('longitude').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('groups');
};
