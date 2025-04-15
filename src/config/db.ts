// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var db: PrismaClient;
}

const prisma = global.db || new PrismaClient();

  global.db = prisma;


export default prisma;
