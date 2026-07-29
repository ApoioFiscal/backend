import { LicitacaoRepository } from "./licitacao.repository";
import { CreateLicitacaoInput, UpdateLicitacaoInput } from "../../common/schemas";
import { NotFoundError } from "../../common/errors";

export class LicitacaoService {
  constructor(private repository: LicitacaoRepository) {}

  async create(input: CreateLicitacaoInput) {
    return this.repository.create(input);
  }

  async update(id: number, input: UpdateLicitacaoInput) {
    const licitacao = await this.repository.findById(id);
    
    if (!licitacao) {
      throw new NotFoundError("Licitação");
    }

    return this.repository.update(id, input);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const licitacao = await this.repository.findById(id);
    
    if (!licitacao) {
      throw new NotFoundError("Licitação");
    }
    
    return licitacao;
  }

  async deleteById(id: number) {
    const licitacao = await this.repository.findById(id);
    
    if (!licitacao) {
      throw new NotFoundError("Licitação");
    }

    return this.repository.deleteById(id);
  }
}