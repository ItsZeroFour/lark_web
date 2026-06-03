/**
 * Seeds the first admin user.
 *
 * Reads ADMIN_EMAIL / ADMIN_PASSWORD from the environment (falls back to dev
 * defaults). Idempotent: upserts by email, so re-running just refreshes the
 * password/role.
 *
 *   npm run db:seed
 */
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@larkfreelance.dev").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "change-me-now";
  const name = process.env.ADMIN_NAME ?? "Admin";

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: Role.ADMIN, name },
    create: { email, passwordHash, role: Role.ADMIN, name },
  });

  console.log(`✓ Admin ready: ${user.email} (role: ${user.role})`);
  if (password === "change-me-now") {
    console.warn(
      "⚠  Используется пароль по умолчанию. Задайте ADMIN_PASSWORD в .env и запустите seed снова.",
    );
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
