import { User } from '@prisma/client';
import { UserNoHash } from 'src/dto/user_no_hash';

export function userToUserNoHash(user: User): UserNoHash {
  delete user.hash;
  // return {
  //   id: user.id,
  //   name: user.name,
  //   phone: user.phone,
  //   email: user.email,
  //   created_at: user.created_at,
  //   referal_code: user.referal_code,
  //   referer_id: user.referer_id,
  // };
  // user.created_at
  return user;
}
