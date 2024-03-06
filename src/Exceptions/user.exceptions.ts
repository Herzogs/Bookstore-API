import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExists extends BadRequestException {
  constructor(message?: string) {
    super(message);
  }
}

export class UserNotFound extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
