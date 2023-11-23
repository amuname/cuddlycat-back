import { Controller, Get } from '@nestjs/common';

@Controller('lk')
export class LkController {
  @Get()
  lk() {
    return 'Hello lk!';
  }
}
