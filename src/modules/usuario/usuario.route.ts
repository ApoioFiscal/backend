import { Router } from "express";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { UsuarioRepository } from "./usuario.repository";
import { SetorRepository } from "../setor/setor.repository";
import { asyncHandler, validateBody, validateParams } from "../../common/middleware";
import { CreateUsuarioSchema, IdParamSchema } from "../../common/schemas";

// Injeção de dependência
const usuarioRepository = new UsuarioRepository();
const setorRepository = new SetorRepository();
const service = new UsuarioService(usuarioRepository, setorRepository);
const controller = new UsuarioController(service);

export const usuarioRouter = Router();

usuarioRouter.post(
  "/",
  validateBody(CreateUsuarioSchema),
  asyncHandler((req, res) => controller.create(req, res))
);

usuarioRouter.get(
  "/",
  asyncHandler((req, res) => controller.findAll(req, res))
);

usuarioRouter.get(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler((req, res) => controller.findById(req, res))
);