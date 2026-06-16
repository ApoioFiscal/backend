import { Router } from "express";
import { SetorController } from "./setor.controller";
import { SetorService } from "./setor.service";
import { SetorRepository } from "./setor.repository";
import { asyncHandler, validateBody, validateParams } from "../../common/middleware";
import { CreateSetorSchema, IdParamSchema, UpdateSetorSchema } from "../../common/schemas";

// Injeção de dependência
const repository = new SetorRepository();
const service = new SetorService(repository);
const controller = new SetorController(service);

export const setorRouter = Router();

setorRouter.post(
  "/",
  validateBody(CreateSetorSchema),
  asyncHandler((req, res) => controller.create(req, res))
);

setorRouter.patch(
  "/:id",
  validateBody(UpdateSetorSchema),
  asyncHandler((req, res) => controller.update(req, res))
)

setorRouter.get(
  "/",
  asyncHandler((req, res) => controller.findAll(req, res))
);

setorRouter.get(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler((req, res) => controller.findById(req, res))
);

setorRouter.delete(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler((req,res) => controller.delete(req, res))
)