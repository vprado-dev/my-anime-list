const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("produtoresAnimes", (table) => {
    // fields
    table.integer("produtorId").notNullable();
    table.integer("animeId").notNullable();

    // primary keys
    table.primary(["produtorId", "animeId"]);

    // foreign keys
    table
      .foreign("produtorId")
      .references("produtorId")
      .inTable("produtores")
      .onDelete("no action")
      .onUpdate("cascade");
    table
      .foreign("animeId")
      .references("animeId")
      .inTable("animes")
      .onDelete("no action")
      .onUpdate("cascade");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("produtoresAnimes");
};
