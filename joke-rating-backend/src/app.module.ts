import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joke } from './database/joke.entity';
import { JokesController } from './controller/joke.controller';
import { JokesService } from './service/joke.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'poll_user',
      password: 'poll_password',
      database: 'poll_db',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Joke]),
  ],
  controllers: [JokesController],
  providers: [JokesService],
})
export class AppModule {}
