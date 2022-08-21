import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/app/modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule} from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports:[
    ConfigModule.forRoot(),
    PassportModule,
    UserModule,
    JwtModule.register({
        privateKey:process.env.JWT_TOKEN,
        signOptions:{expiresIn:'10h'}
    })
],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})

export class AuthModule {}
