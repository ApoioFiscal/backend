import bcrypt from "bcrypt";
import { UsuarioRepository } from "./usuario.repository";
import { SetorRepository } from "../setor/setor.repository";
import { CreateUsuarioInput } from "../../common/schemas";
import { DuplicateEmailError, NotFoundError } from "../../common/errors";

const SALT_ROUNDS = 12;

export class UsuarioService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private setorRepository: SetorRepository
  ) {}

  async create(input: CreateUsuarioInput) {
    // Valida email único
    const emailJaExiste = await this.usuarioRepository.findByEmail(input.email);
    if (emailJaExiste) {
      throw new DuplicateEmailError();
    }

    // Valida setor existente
    const setorExiste = await this.setorRepository.findById(input.idSetor);
    if (!setorExiste) {
      throw new NotFoundError("Setor");
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(input.senha, SALT_ROUNDS);

    return this.usuarioRepository.create({
      ...input,
      senha: senhaHash,
    });
  }

  async findAll() {
    return this.usuarioRepository.findAll();
  }

  async findById(id: number) {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundError("Usuário");
    }
    return usuario;
  }
}