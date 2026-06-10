import { Request, Response } from "express";
import { UsuarioService } from "./usuario.service";
import { sendSuccess } from "../../common/middleware";

export class UsuarioController {
  constructor(private service: UsuarioService) {}

  async create(req: Request, res: Response): Promise<void> {
    const usuario = await this.service.create(req.body);
    sendSuccess(res, usuario, 201);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const usuarios = await this.service.findAll();
    sendSuccess(res, usuarios);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const usuario = await this.service.findById(id);
    sendSuccess(res, usuario);
  }
}