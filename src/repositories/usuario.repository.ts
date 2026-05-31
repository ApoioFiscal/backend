import { FuncaoUsuario } from "@prisma/client";
import { prisma } from "../prisma/client";

export interface CreateUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  funcao: FuncaoUsuario;
  isAdmin?: boolean;
  idSetor: number;
}

export const usuarioRepository = {
  async create(data: CreateUsuarioDTO) {
    return prisma.usuario.create({
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        funcao: true,
        isAdmin: true,
        criadoEm: true,
        setor: {
          select: {
            id: true,
            nome: true,
            sigla: true,
          },
        },
      },
    });
  },

  async findByEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  },

  async findById(id: number) {
    return prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        funcao: true,
        isAdmin: true,
        criadoEm: true,
        setor: {
          select: {
            id: true,
            nome: true,
            sigla: true,
          },
        },
      },
    });
  },

  async findAll() {
    return prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        funcao: true,
        isAdmin: true,
        criadoEm: true,
        setor: {
          select: {
            id: true,
            nome: true,
            sigla: true,
          },
        },
      },
      orderBy: { criadoEm: "desc" },
    });
  },
};