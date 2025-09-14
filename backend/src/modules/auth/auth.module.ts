import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secret key!35u3',
      signOptions: { expiresIn: '10m' },
    }),
  ],
})
export class AuthModule {}
