import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

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
