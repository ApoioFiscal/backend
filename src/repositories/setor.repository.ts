import { prisma } from "../prisma/client";

export interface CreateSetorDTO {
  nome: string;
  sigla: string;
}

export const setorRepository = {
  async create(data: CreateSetorDTO) {
    return prisma.setor.create({ data });
  },

  async findById(id: number) {
    return prisma.setor.findUnique({ where: { id } });
  },

  async findBySigla(sigla: string) {
    return prisma.setor.findUnique({ where: { sigla } });
  },

  async findAll() {
    return prisma.setor.findMany({ orderBy: { nome: "asc" } });
  },
};