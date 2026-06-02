import { Request, Response } from "express";
import { setorService } from "./setor.service";

export const setorController = {
  async create(req: Request, res: Response): Promise<void> {
    const { nome, sigla } = req.body;

    if (!nome || !sigla) {
      res.status(400).json({ erro: "Campos obrigatórios: nome, sigla" });
      return;
    }

    try {
      const setor = await setorService.create({ nome, sigla: sigla.toUpperCase() });
      res.status(201).json(setor);
    } catch (error) {
      if (error instanceof Error && error.message === "SIGLA_JA_CADASTRADA") {
        res.status(409).json({ erro: "Sigla já cadastrada" });
        return;
      }
      res.status(500).json({ erro: "Erro interno do servidor" });
    }
  },

  async findAll(_req: Request, res: Response): Promise<void> {
    try {
      const setores = await setorService.findAll();
      res.status(200).json(setores);
    } catch {
      res.status(500).json({ erro: "Erro interno do servidor" });
    }
  },

  async findById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ erro: "ID inválido" });
      return;
    }

    try {
      const setor = await setorService.findById(id);
      res.status(200).json(setor);
    } catch (error) {
      if (error instanceof Error && error.message === "SETOR_NAO_ENCONTRADO") {
        res.status(404).json({ erro: "Setor não encontrado" });
        return;
      }
      res.status(500).json({ erro: "Erro interno do servidor" });
    }
  },
};