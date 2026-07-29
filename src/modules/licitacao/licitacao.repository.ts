import { prisma } from "../../prisma/client";
import { CreateLicitacaoInput, UpdateLicitacaoInput } from "../../common/schemas";

export class LicitacaoRepository {
  async create(data: CreateLicitacaoInput) {
    //Toda licitação nova já nasce ativa, status: true
    return prisma.licitacaoContrato.create({ 
      data: {
        ...data,
        status: true 
      } 
    });
  }

  async update(id: number, data: UpdateLicitacaoInput) {
     return prisma.licitacaoContrato.update({
      where: { id },
      data
     });
  }

  async findById(id: number) {
    return prisma.licitacaoContrato.findFirst({ 
        where: {
             id: id,
             status:true 
            } });

  }

  async findAll() {
    // apenas as licitações que não foram "apagadas"
    return prisma.licitacaoContrato.findMany({ 
      where: { status: true },
      orderBy: { dataAbertura: "desc" } 
    });
  }

  async deleteById(id: number) {
    return prisma.licitacaoContrato.update({
      where: { id },
      data: { status: false } // linha "deletada"
    });
  }
}