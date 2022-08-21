import { Module } from '@nestjs/common';
import {ConfigModule,ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './app/movie.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
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
    MovieModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
