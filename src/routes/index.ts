import { Router } from "express";
import { setorRouter } from "../modules/setor/setor.route";
import { usuarioRouter } from "../modules/usuario/usuario.route";

export const router = Router();

router.use("/setores", setorRouter);
router.use("/usuarios", usuarioRouter);


