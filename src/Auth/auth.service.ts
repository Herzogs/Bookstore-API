import { BadRequestException, Injectable } from '@nestjs/common';
import { UserLoginDto } from 'src/Auth/dto/UserLogin.dto';
import { UserRegisterDto } from 'src/Auth/dto/UserRegister.dto';
import { User } from 'src/User/entities/user.entity';
import { UserService } from 'src/User/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginUser(userLoginDto: UserLoginDto): Promise<string> {
    const user = await this.userService.findOneByEmail(userLoginDto.email);
    if (user && (await bcrypt.compare(userLoginDto.password, user.password))) {
      const payload = { email: user.email, rol: user.rol, sub: user.id };
      return this.jwtService.sign(payload, { expiresIn: '1d' });
    }
    throw new BadRequestException('Invalid credentials');
  }

  async registerUser(UserRegisterDto: UserRegisterDto): Promise<User> {
    const newUser = new User();
    newUser.email = UserRegisterDto.email;
    newUser.name = UserRegisterDto.name;
    newUser.lastname = UserRegisterDto.lastname;
    newUser.username = UserRegisterDto.username;
    newUser.address = UserRegisterDto.address;
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(UserRegisterDto.password, salt);
    return this.userService.createUser(newUser);
  }
}
