import { prisma } from "../../prisma/client";
import { CreateSetorInput } from "../../common/schemas";

export class SetorRepository {
  async create(data: CreateSetorInput) {
    return prisma.setor.create({ data });
  }

  async findById(id: number) {
    return prisma.setor.findUnique({ where: { id } });
  }

  async findBySigla(sigla: string) {
    return prisma.setor.findUnique({ where: { sigla } });
  }

  async findAll() {
    return prisma.setor.findMany({ orderBy: { nome: "asc" } });
  }
}