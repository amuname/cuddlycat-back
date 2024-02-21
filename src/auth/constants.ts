import 'dotenv/config';
// console.log(process.env.JWT_SECRET || process.env.JWT_SECRET_DEV);
export const jwtConstants = {
  secret: process.env.JWT_SECRET || process.env.JWT_SECRET_DEV,
};
