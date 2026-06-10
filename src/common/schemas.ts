import { z } from "zod";
import { FuncaoUsuario } from "@prisma/client";

// ==================== SETOR SCHEMAS ====================
export const CreateSetorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").trim(),
  sigla: z.string().min(1, "Sigla é obrigatória").toUpperCase(),
});

export type CreateSetorInput = z.infer<typeof CreateSetorSchema>;

// ==================== USUARIO SCHEMAS ====================
export const CreateUsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").trim(),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  funcao: z.enum([
    FuncaoUsuario.PREFEITO,
    FuncaoUsuario.SECRETARIO,
    FuncaoUsuario.SERVIDOR,
    FuncaoUsuario.FISCAL,
  ]),
  isAdmin: z.boolean().optional().default(false),
  idSetor: z.number().int().positive("ID do setor deve ser um número positivo"),
});

export type CreateUsuarioInput = z.infer<typeof CreateUsuarioSchema>;

// ==================== ID VALIDATION ====================
export const IdParamSchema = z.object({
  id: z.string().pipe(
    z.coerce.number().int("ID deve ser um número inteiro").positive("ID deve ser positivo")
  ),
});

export type IdParam = z.infer<typeof IdParamSchema>;
