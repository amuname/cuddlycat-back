import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || process.env.JWT_SECRET_DEV,
};
