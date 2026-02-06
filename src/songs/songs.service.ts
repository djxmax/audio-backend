import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './song.schema';

// On définit une interface pour ce qu'on attend du front
interface CreateSongDto {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;      // L'URL .mp3 reçue d'Uploadthing
  coverUrl: string; // L'URL de l'image reçue d'Uploadthing
}

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  // Récupérer toutes les musiques
  async findAll(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  // Créer une nouvelle musique (pour ton futur formulaire)
  async create(createSongDto: CreateSongDto): Promise<Song> {
    const newSong = new this.songModel(createSongDto);
    return newSong.save();
  }
}