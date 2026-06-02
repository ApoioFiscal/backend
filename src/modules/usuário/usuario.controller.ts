import  { Request, Response } from "express";
import { FuncaoUsuario } from "@prisma/client";
import { usuarioService } from "./usuario.service";

export const usuarioController = {
  async create(req: Request, res: Response): Promise<void> {
    const { nome, email, senha, funcao, isAdmin, idSetor } = req.body;

    if (!nome || !email || !senha || !funcao || !idSetor) {
      res.status(400).json({ erro: "Campos obrigatórios: nome, email, senha, funcao, idSetor" });
      return;
    }

    const funcoesValidas = Object.values(FuncaoUsuario);
    if (!funcoesValidas.includes(funcao)) {
      res.status(400).json({
        erro: `Função inválida. Valores aceitos: ${funcoesValidas.join(", ")}`,
      });
      return;
    }

    try {
      const usuario = await usuarioService.create({
        nome,
        email,
        senha,
        funcao,
        isAdmin: isAdmin ?? false,
        idSetor: Number(idSetor),
      });

      res.status(201).json(usuario);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "EMAIL_JA_CADASTRADO") {
          res.status(409).json({ erro: "E-mail já cadastrado" });
          return;
        }
        if (error.message === "SETOR_NAO_ENCONTRADO") {
          res.status(404).json({ erro: "Setor não encontrado" });
          return;
        }
      }
      res.status(500).json({ erro: "Erro interno do servidor" });
    }
  },

  async findAll(_req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await usuarioService.findAll();
      res.status(200).json(usuarios);
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
      const usuario = await usuarioService.findById(id);
      res.status(200).json(usuario);
    } catch (error) {
      if (error instanceof Error && error.message === "USUARIO_NAO_ENCONTRADO") {
        res.status(404).json({ erro: "Usuário não encontrado" });
        return;
      }
      res.status(500).json({ erro: "Erro interno do servidor" });
    }
  },
};