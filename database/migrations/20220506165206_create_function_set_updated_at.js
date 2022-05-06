const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.raw(`
    create function "setUpdatedAt"()
    returns trigger
    as $$
    begin
      NEW."updatedAt" = now();
      return NEW;
    end;
    $$ language "plpgsql";
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async function (knex) {
  await knex.schema.raw(`drop function "setUpdatedAt";`);
};
