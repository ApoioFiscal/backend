import { SetorRepository } from "./setor.repository";
import { CreateSetorInput } from "../../common/schemas";
import { DuplicateDataError, NotFoundError } from "../../common/errors";

export class SetorService {
  constructor(private repository: SetorRepository) {}

  async create(input: CreateSetorInput) {
    const siglaJaExiste = await this.repository.findBySigla(input.sigla);
    if (siglaJaExiste) {
      throw new DuplicateDataError("Sigla");
    }

    return this.repository.create(input);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const setor = await this.repository.findById(id);
    if (!setor) {
      throw new NotFoundError("Setor");
    }
    return setor;
  }
}