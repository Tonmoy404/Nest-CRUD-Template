import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  startMessage(): string {
    return 'My Crud App is Running';
  }
}
