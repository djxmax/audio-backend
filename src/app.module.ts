import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsController } from './songs/songs.controller';
import { SongsService } from './songs/songs.service';
import { Song, SongSchema } from './songs/song.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }])
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class AppModule {}
