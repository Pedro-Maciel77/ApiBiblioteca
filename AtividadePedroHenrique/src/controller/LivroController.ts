import { Router } from "express";
import { DataSource } from "typeorm";
import { Livro } from "../entity/Livro";

const router = Router();
const AppDataSource = new DataSource(require("../../ormconfig.json"));

const getRepo = () => AppDataSource.getRepository(Livro);

router.post("/", async (req, res) => {
  const repo = getRepo();
  const livro = repo.create(req.body as Partial<Livro>);
  const saved = await repo.save(livro);
  res.status(201).json(saved);
});

router.get("/", async (req, res) => {
  const repo = getRepo();
  const all = await repo.find();
  res.json(all);
});

router.get("/:id", async (req, res) => {
  const repo = getRepo();
  const l = await repo.findOneBy({ id: parseInt(req.params.id) });
  if (!l) return res.sendStatus(404);
  res.json(l);
});

router.put("/:id", async (req, res) => {
  const repo = getRepo();
  const id = parseInt(req.params.id);
  let l = await repo.findOneBy({ id });
  if (!l) return res.sendStatus(404);
  repo.merge(l, req.body);
  const updated = await repo.save(l);
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const repo = getRepo();
  const id = parseInt(req.params.id);
  const result = await repo.delete(id);
  if (result.affected === 0) return res.sendStatus(404);
  res.sendStatus(204);
});

export default router;
