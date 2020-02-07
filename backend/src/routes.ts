import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.send({ ok: "ok" });
});

routes.post("/files", (req, res) => {
  console.log(req.body);
  res.status(200);
});

export default routes;
