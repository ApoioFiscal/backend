// Enum com todos os códigos de erro
export enum ErrorCode {
  DUPLICATE_SIGLA = "DUPLICATE_SIGLA",
  DUPLICATE_EMAIL = "DUPLICATE_EMAIL",
  SETOR_NOT_FOUND = "SETOR_NOT_FOUND",
  USUARIO_NOT_FOUND = "USUARIO_NOT_FOUND",
  INVALID_ID = "INVALID_ID",
  INVALID_FUNCAO = "INVALID_FUNCAO",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

// Classe base para erros da aplicação
export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Erros específicos de negócio
export class DuplicateDataError extends AppError {
  constructor(field: string) {
    super(
      ErrorCode.DUPLICATE_SIGLA,
      `${field} já cadastrado`,
      409
    );
    this.name = "DuplicateDataError";
  }
}

export class DuplicateEmailError extends AppError {
  constructor() {
    super(
      ErrorCode.DUPLICATE_EMAIL,
      "E-mail já cadastrado",
      409
    );
    this.name = "DuplicateEmailError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(
      ErrorCode.SETOR_NOT_FOUND,
      `${resource} não encontrado`,
      404
    );
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(
      ErrorCode.VALIDATION_ERROR,
      message,
      400,
      details
    );
    this.name = "ValidationError";
  }
}

export class InvalidIdError extends AppError {
  constructor() {
    super(
      ErrorCode.INVALID_ID,
      "ID inválido",
      400
    );
    this.name = "InvalidIdError";
  }
}
