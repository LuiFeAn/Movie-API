import { Module,CacheModule } from '@nestjs/common';
import {ConfigModule,ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './app/modules/movie.module';
import { UserModule } from './app/modules/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      isGlobal:true,
      store:redisStore,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGSQL_HOST','localhost'),
        port: Number(configService.get('PGSQL_PORT',5432)),
        username: configService.get('PGSQL_USER','root'),
        password: configService.get('PGSQL_PASSWORD','1234'),
        database: configService.get('PGSQL_DB','moviedatabase'),
        entities: [`${__dirname}/**/*.entity{.js,.ts}`],
        synchronize: true,
      })
    }),
    MovieModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [{
    provide:APP_INTERCEPTOR,
    useClass:CacheInterceptor
  }],
})
export class AppModule {}
