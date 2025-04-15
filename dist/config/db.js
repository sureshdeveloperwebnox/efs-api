"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/lib/db.ts
const client_1 = require("@prisma/client");
const prisma = global.db || new client_1.PrismaClient();
global.db = prisma;
exports.default = prisma;
