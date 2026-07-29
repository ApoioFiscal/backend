-- CreateEnum
CREATE TYPE "FuncaoUsuario" AS ENUM ('PREFEITO', 'SECRETARIO', 'SERVIDOR', 'FISCAL');

-- CreateTable
CREATE TABLE "setor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "idSetor" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "funcao" "FuncaoUsuario" NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licitacao" (
    "id" SERIAL NOT NULL,
    "numeroProcesso" TEXT NOT NULL,
    "dataAbertura" TIMESTAMP(3) NOT NULL,
    "dataFechamento" TIMESTAMP(3) NOT NULL,
    "modalidade" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "licitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_licitado" (
    "id" SERIAL NOT NULL,
    "idLicitacao" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" DOUBLE PRECISION NOT NULL,
    "precoTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "item_licitado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacao" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idItemLicitado" INTEGER NOT NULL,
    "dataSolicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantPedida" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "usuarioID" INTEGER NOT NULL,

    CONSTRAINT "solicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "setor_sigla_key" ON "setor"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "usuario_idSetor_idx" ON "usuario"("idSetor");

-- CreateIndex
CREATE INDEX "item_licitado_idLicitacao_idx" ON "item_licitado"("idLicitacao");

-- CreateIndex
CREATE INDEX "solicitacao_idUsuario_idx" ON "solicitacao"("idUsuario");

-- CreateIndex
CREATE INDEX "solicitacao_idItemLicitado_idx" ON "solicitacao"("idItemLicitado");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_idSetor_fkey" FOREIGN KEY ("idSetor") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_licitado" ADD CONSTRAINT "item_licitado_idLicitacao_fkey" FOREIGN KEY ("idLicitacao") REFERENCES "licitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_idItemLicitado_fkey" FOREIGN KEY ("idItemLicitado") REFERENCES "item_licitado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
