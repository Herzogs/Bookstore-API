import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  UserAlreadyExists,
  UserNotFound,
} from 'src/Exceptions/user.exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const searchUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (searchUser !== null) {
      throw new UserAlreadyExists('User already exists');
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (user === null) {
      throw new UserNotFound('User not found');
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (user === null) {
      throw new UserNotFound('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
