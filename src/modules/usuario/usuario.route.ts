import { Router } from "express";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { UsuarioRepository } from "./usuario.repository";
import { SetorRepository } from "../setor/setor.repository";
import { asyncHandler, autenticationMiddleware, validateBody, validateParams } from "../../common/middleware";
import { CreateUsuarioSchema, IdParamSchema, UsuarioLoginSchema } from "../../common/schemas";

// Injeção de dependência
const usuarioRepository = new UsuarioRepository();
const setorRepository = new SetorRepository();
const service = new UsuarioService(usuarioRepository, setorRepository);
const controller = new UsuarioController(service);

export const usuarioRouter = Router();

// Rota para criar um novo usuário
usuarioRouter.post(
  "/",
  validateBody(CreateUsuarioSchema),
  asyncHandler((req, res) => controller.create(req, res))
);

// Rota de Login do usuário
usuarioRouter.post(
  "/login",
  validateBody(UsuarioLoginSchema),
  asyncHandler((req, res) => controller.loginUser(req, res))
)

// Rota para buscar todos os usuários
usuarioRouter.get(
  "/",
  asyncHandler((req, res) => controller.findAll(req, res))
);

// Rota para pegar um usuário por id
usuarioRouter.get(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler((req, res) => controller.findById(req, res))
);

// Rota para deletar um usuário
usuarioRouter.delete(
  "/:id",
  validateParams(IdParamSchema),
  autenticationMiddleware,
  asyncHandler((req, res) => controller.deleteById(req, res))
)