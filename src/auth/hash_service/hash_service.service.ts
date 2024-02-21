import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 5;

@Injectable()
export class HashService {
  hashGenerate(data: string) {
    console.log('@Payload: ', data);
    return bcrypt.hash(data, SALT_ROUNDS);
  }

  hashSourceCompare(data: string, encrypted: string) {
    return bcrypt.compare(data, encrypted);
  }
}
