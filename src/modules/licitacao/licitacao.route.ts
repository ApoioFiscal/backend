import { Router } from "express";
import { LicitacaoController } from "./licitacao.controller";
import { LicitacaoService } from "./licitacao.service";
import { LicitacaoRepository } from "./licitacao.repository";
import { asyncHandler, validateBody, validateParams } from "../../common/middleware";
import { CreateLicitacaoSchema, IdParamSchema, UpdateLicitacaoSchema } from "../../common/schemas";

const repository = new LicitacaoRepository();
const service = new LicitacaoService(repository);
const controller = new LicitacaoController(service);

export const licitacaoRouter = Router();

licitacaoRouter.post(
  "/",
  validateBody(CreateLicitacaoSchema),
  asyncHandler((req, res) => controller.create(req, res))
);

licitacaoRouter.get(
  "/",
  asyncHandler((req, res) => controller.findAll(req, res))
);

licitacaoRouter.get(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler((req, res) => controller.findById(req, res))
);

licitacaoRouter.patch(
  "/:id",
  validateParams(IdParamSchema), // Valida o ID na URL
  validateBody(UpdateLicitacaoSchema), // Valida o corpo da requisição
  asyncHandler((req, res) => controller.update(req, res))
);

licitacaoRouter.delete(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler((req, res) => controller.delete(req, res))
);