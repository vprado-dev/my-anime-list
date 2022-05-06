const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("animes", (table) => {
    // fields
    table.increments("animeId", { primaryKey: false }).notNullable();
    table.text("nome").notNullable();
    table.text("sinopse").notNullable();
    table.text("referenciaExterna");
    table.date("dataLancamento").notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());

    // primary
    table.primary(["animeId"]);

    // unique keys
    table.unique(["referenciaExterna"]);
  });

  // triggers
  await knex.schema.raw(`
    create trigger "tr_animes_setUpdatedAt"
    before update on animes
    for each row
    execute procedure "setUpdatedAt"();
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("animes");
};
