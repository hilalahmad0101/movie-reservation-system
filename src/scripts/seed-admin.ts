import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcrypt';
import { User } from '../admin/user/entities/user.entity';
import { Role } from '../common/enums/role.enum';

async function run() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(User);

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@demo.com';
  const name = process.env.SEED_ADMIN_NAME || 'Super Admin';
  const password1 = process.env.SEED_ADMIN_PASSWORD || 'admin123';

  const exists = await repo.findOne({ where: { email } });
  if (exists) {
    console.log('Admin already exists:', email);
    await AppDataSource.destroy();
    return;
  }

  const password = await bcrypt.hash(password1, 10);
  const admin = repo.create({ email, name, password, role: Role.ADMIN });
  await repo.save(admin);

  console.log('Seeded admin:', { email, password });
  await AppDataSource.destroy();
}

run().catch(async (e) => {
  console.error(e);
  try {
    await AppDataSource.destroy();
  } catch {}
  process.exit(1);
});
