import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: Role.ADMIN,
    },
  });

  if (!existingAdmin) {
    const encryptedPassword = bcrypt.hashSync('admin', 10);
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: encryptedPassword,
        role: Role.ADMIN,
        isSuperAdmin: true,
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
