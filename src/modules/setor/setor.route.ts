import { router } from "../../routes";
import { setorController } from "./setor.controller";

router.post("/setores", setorController.create);
router.get("/setores", setorController.findAll);
router.get("/setores/:id", setorController.findById);