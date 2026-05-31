import { Router } from "express";
import { usuarioController } from "../controllers/usuario.controller";
import { setorController } from "../controllers/setor.controller";

export const router = Router();

// Setor precisa existir antes de cadastrar usuário
router.post("/setores", setorController.create);
router.get("/setores", setorController.findAll);
router.get("/setores/:id", setorController.findById);

router.post("/usuarios", usuarioController.create);
router.get("/usuarios", usuarioController.findAll);
router.get("/usuarios/:id", usuarioController.findById);