import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError, ValidationError } from "./errors";

// ==================== ASYNC HANDLER ====================
/**
 * Wrapper que captura erros assíncronos e passa para o error handler
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// ==================== VALIDATION MIDDLEWARE ====================
/**
 * Middleware para validar body com schema Zod
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

/**
 * Middleware para validar params com schema Zod
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.params);
      req.params = validated;
      next();
    } catch (error: any) {
      throw new ValidationError("Parâmetros inválidos");
    }
  };
};

// ==================== ERROR HANDLER ====================
/**
 * Middleware global de tratamento de erros
 */
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

// ==================== RESPONSE HELPER ====================
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
