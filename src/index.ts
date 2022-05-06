import dotenv from "dotenv-safe";

dotenv.config();

import app from "./app";
import { database } from "./utils/database";

const PORT = +process.env.PORT || 3000;

(async () => {
  await database.raw('select 1 as "serverStatus"');

  if (process.env.MIGRATIONS_ENABLED) {
    await database.migrate.latest();
  }

  app.listen(PORT, () => {
    console.info(`Enviroment ${process.env.NODE_ENV}`);
    console.info(`🟢 Listening at http://localhost:${PORT}`);
  });
})().catch((err) => {
  console.log(err);
  process.exit(1);
});
