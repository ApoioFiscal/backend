import { email, z } from "zod";
import { FuncaoUsuario } from "@prisma/client";

// Schemas para criar novo setor 
export const CreateSetorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").trim(),
  sigla: z.string().min(1, "Sigla é obrigatória").toUpperCase(),
});

// Schema para atualizar novo setor, campos não obrigatórios.
export const UpdateSetorSchema = CreateSetorSchema.partial()

export type CreateSetorInput = z.infer<typeof CreateSetorSchema>;

export type UpdateSetorInput = z.infer<typeof UpdateSetorSchema>

// Schemas de criação de um novo Usuario
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

// Validção de ID
export const IdParamSchema = z.object({
  id: z.string()
    .regex(/^\d+$/, "ID deve conter apenas números")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("ID deve ser positivo")),
});

export type IdParam = z.infer<typeof IdParamSchema>;

export const UsuarioLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve conter no minimo 6 caracteres")
})

export type LoginUserInput = z.infer<typeof UsuarioLoginSchema>;


export const CreateLicitacaoSchema = z.object({
  numeroProcesso: z.string().min(1, "Número do processo é obrigatório"),

  dataAbertura: z.string().transform((str) => new Date(str)),
  dataFechamento: z.string().transform((str) => new Date(str)),
  modalidade: z.string().min(1, "Modalidade é obrigatória"),
  valorTotal: z.number().positive("O valor total deve ser positivo"),
});

export const UpdateLicitacaoSchema = CreateLicitacaoSchema.partial().extend({
  status: z.boolean().optional() 
});

export type CreateLicitacaoInput = z.infer<typeof CreateLicitacaoSchema>;
export type UpdateLicitacaoInput = z.infer<typeof UpdateLicitacaoSchema>;