import bcrypt from "bcrypt";
import { FuncaoUsuario } from "@prisma/client";
import { usuarioRepository, CreateUsuarioDTO } from "./usuario.repository";
import { setorRepository } from "../setor/setor.repository";

const SALT_ROUNDS = 12;

interface CreateUsuarioInput {
  nome: string;
  email: string;
  senha: string;
  funcao: FuncaoUsuario;
  isAdmin?: boolean;
  idSetor: number;
}

export const usuarioService = {
  async create(input: CreateUsuarioInput) {
    const emailJaExiste = await usuarioRepository.findByEmail(input.email);
    if (emailJaExiste) {
      throw new Error("EMAIL_JA_CADASTRADO");
    }

    const setorExiste = await setorRepository.findById(input.idSetor);
    if (!setorExiste) {
      throw new Error("SETOR_NAO_ENCONTRADO");
    }

    const senhaHash = await bcrypt.hash(input.senha, SALT_ROUNDS);

    const data: CreateUsuarioDTO = {
      ...input,
      senha: senhaHash,
    };

    return usuarioRepository.create(data);
  },

  async findAll() {
    return usuarioRepository.findAll();
  },

  async findById(id: number) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error("USUARIO_NAO_ENCONTRADO");
    }
    return usuario;
  },
};