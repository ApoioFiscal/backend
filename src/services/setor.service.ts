import { setorRepository, CreateSetorDTO } from "../repositories/setor.repository";

export const setorService = {
  async create(input: CreateSetorDTO) {
    const siglaJaExiste = await setorRepository.findBySigla(input.sigla);
    if (siglaJaExiste) {
      throw new Error("SIGLA_JA_CADASTRADA");
    }

    return setorRepository.create(input);
  },

  async findAll() {
    return setorRepository.findAll();
  },

  async findById(id: number) {
    const setor = await setorRepository.findById(id);
    if (!setor) {
      throw new Error("SETOR_NAO_ENCONTRADO");
    }
    return setor;
  },
};