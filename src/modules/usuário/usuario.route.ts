import { router } from "../../routes";
import { usuarioController } from "./usuario.controller";

router.post("/usuarios", usuarioController.create);
router.get("/usuarios", usuarioController.findAll);
router.get("/usuarios/:id", usuarioController.findById);