import { User } from '@prisma/client';

export type UserNoHash = Omit<User, 'hash'>;
