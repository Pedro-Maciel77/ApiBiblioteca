import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { Livro } from "./entity/Livro";
import livroRouter from "./controller/LivroController";

const AppDataSource = new DataSource(require("../ormconfig.json"));

AppDataSource.initialize().then(()=> {
  const app = express();
  app.use(express.json());
  app.use("/api/livros", livroRouter);
  app.listen(3000, ()=> console.log("Node API running on http://localhost:3000"));
}).catch(err=>console.error("Data Source init error:", err));
