import { FuncaoUsuario } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma/client';

async function main() {
  console.log('Iniciando o seed do banco de dados...');

  // Garante que o setor Gabinete exista
  const setorGabinete = await prisma.setor.upsert({
    where: { sigla: 'GAB' },
    update: {},
    create: {
      nome: 'Gabinete do Prefeito',
      sigla: 'GAB',
    },
  });

  // Cria a senha criptografada (padrão 123456)
  const senhaHash = await bcrypt.hash('123456', 12);

  // Garante que o Super Usuário exista
  const superAdmin = await prisma.usuario.upsert({
    where: { email: 'admin@marizopolis.gov.br' },
    update: {
      // Se o usuário já existir, garante que ele tenha poder total
      funcao: FuncaoUsuario.PREFEITO,
      isAdmin: true,
      idSetor: setorGabinete.id,
    },
    create: {
      nome: 'Prefeito',
      email: 'admin@marizopolis.gov.br',
      senha: senhaHash,
      funcao: FuncaoUsuario.PREFEITO,
      isAdmin: true,
      idSetor: setorGabinete.id,
    },
  });

  console.log('✅ Seed finalizado! Super Usuário garantido:', superAdmin.email);
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });