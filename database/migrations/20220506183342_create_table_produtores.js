const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("produtores", (table) => {
    // fields
    table.increments("produtorId", { primaryKey: false }).notNullable();
    table.text("nome").notNullable();
    table.text("referenciaExterna");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());

    // primary key
    table.primary(["produtorId"]);

    // unique keys
    table.unique(["referenciaExterna"]);
  });

  // triggers
  await knex.schema.raw(`
    create trigger "tr_produtores_setUpdatedAt"
    before update on produtores
    for each row
    execute procedure "setUpdatedAt"();
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("produtores");
};
