import { Request, Response } from "express";
import { SetorService } from "./setor.service";
import { sendSuccess } from "../../common/middleware";

export class SetorController {
  constructor(private service: SetorService) {}

  async create(req: Request, res: Response): Promise<void> {
    const setor = await this.service.create(req.body);
    sendSuccess(res, setor, 201);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const setores = await this.service.findAll();
    sendSuccess(res, setores);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const setor = await this.service.findById(id);
    sendSuccess(res, setor);
  }
}