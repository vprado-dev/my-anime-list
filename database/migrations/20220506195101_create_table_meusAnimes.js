const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("meusAnimes", (table) => {
    // fields
    table.increments("meuAnimeId", { primaryKey: false }).notNullable();
    table.integer("animeId").notNullable();
    table.integer("nota").notNullable();
    table.text("comentario");
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable();

    // primary key
    table.primary(["meuAnimeId"]);

    // foreign keys
    table
      .foreign("animeId")
      .references("animeId")
      .inTable("animes")
      .onDelete("no action")
      .onUpdate("cascade");
  });
  // triggers
  await knex.schema.raw(`
    create trigger "tr_meusAnimes_setUpdatedAt"
    before update on "meusAnimes"
    for each row
    execute procedure "setUpdatedAt"();
  `);

  // constraint
  await knex.schema.raw(`
    alter table "meusAnimes" add constraint "ck_meusAnimes_nota" check (nota>=1 and nota<=10);
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("meusAnimes");
};
