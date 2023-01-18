// This file makes a prisma client, doing the same thing seeds.ts does so we can import faster.
import { PrismaClient } from '@prisma/client'

export default new PrismaClient()