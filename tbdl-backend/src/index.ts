import "reflect-metadata";

import express from "express";
import { createConnection } from "typeorm";
import { join } from "path";
import { constants } from "./constants";
import { User } from "./entities/User";

const main = async () => {
  const { __prod__, username, password, database } = constants;
  await createConnection({
    type: "postgres",
    database: database,
    username: username,
    password: password,
    entities: [join(__dirname, "./entities/*.*")],
    logging: !__prod__,
    synchronize: !__prod__,
  });

  const user = await User.create({ name: "bob" }).save();
  console.log({ user });
  const app = express();

  app.get("/", (_req, res) => {
    res.send("Hello!");
  });

  app.listen(3002, () => {
    console.log("Listening on localhost:3002");
  });
};

main();
