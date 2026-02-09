import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/song.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // Pour charger le .env
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''),
    SongsModule,    // On importe le bloc complet
    PlaylistsModule // On importe le bloc complet
  ],
})
export class AppModule {}
