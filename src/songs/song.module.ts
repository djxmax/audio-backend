import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song, SongSchema } from './song.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }])
  ],
  controllers: [SongsController],
  providers: [SongsService],
  // TRÈS IMPORTANT : On exporte le SongsService pour que d'autres 
  // modules (comme Playlist) puissent l'utiliser si besoin.
  exports: [SongsService] 
})
export class SongsModule {}