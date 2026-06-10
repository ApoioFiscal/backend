import { Request, Response } from "express";
import { SetorService } from "./setor.service";
import { sendSuccess } from "../../common/middleware";

export class SetorController {
  constructor(private service: SetorService) {}

  // Criar novo setor
  async create(req: Request, res: Response): Promise<void> {
    const setor = await this.service.create(req.body);
    sendSuccess(res, setor, 201);
  }

  // Buscar todos os setores
  async findAll(req: Request, res: Response): Promise<void> {
    const setores = await this.service.findAll();
    sendSuccess(res, setores);
  }

  // Encontrar setor por ID
  async findById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const setor = await this.service.findById(id);
    sendSuccess(res, setor);
  }
}