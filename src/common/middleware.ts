import { Request, Response, NextFunction } from "express";
import {  ZodSchema } from "zod";
import { AppError, ValidationError } from "./errors";
import { ParamsDictionary } from "express-serve-static-core"
import  jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  id: number;
  email: string;
}

// Estender tipo Request para incluir usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Handler Assíncrono
// Wrapper que captura erros assíncronos e passa para o error handler
export const asyncHandler = (
  fn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

//  Middleware para validar body com schema Zod
export const validateBody = (schema: ZodSchema) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      const details = error.errors?.reduce((acc: any, err: any) => {
        acc[err.path.join(".")] = err.message;
        return acc;
      }, {});

      throw new ValidationError("Dados inválidos", details);
    }
  };
};

// Middleware para validar params com schema Zod
export const validateParams = (schema: ZodSchema) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validated = schema.parse(req.params) as ParamsDictionary;
      req.params = validated;
      next();
    } catch (error: any) {
      throw new ValidationError("Parâmetros inválidos");
    }
  };
};

// Middleware de autenticação com jsonWebToken
export const autenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Pega os headers da requisição
  const authHeader = req.headers.authorization;

  // Caso não tenha token retorna erro
  if(!authHeader){
    throw new ValidationError("Token não informado");
  }

  const [type, token] = authHeader.split(" ")

  if(type != "Bearer"){
    throw new ValidationError("Formato de token inválido");
  }

  try{
    // Verifica a assinatura do token, se estiver tudo certo chama a próxima parte.
    const payload = jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload;

    req.user = payload;

    next()
  }catch{
    throw new ValidationError("Token inválido")
  }
}

//  ERROR HANDLER 

// Middleware global de tratamento de erros
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("[ERROR]", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
  }

  // Erro desconhecido
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Erro interno do servidor",
    },
  });
};

//  RESPONSE HELPER 
/**
 * Tipos de resposta estruturados
 */
export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Helper para enviar respostas padronizadas de sucesso
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};
