import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { UserModule } from 'src/User/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'RWpVAtI2UWpYaP2A',
    }),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
