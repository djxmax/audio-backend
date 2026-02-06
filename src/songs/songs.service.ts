import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './song.schema';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  // Récupérer toutes les musiques
  async findAll(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  // Créer une nouvelle musique (pour ton futur formulaire)
  async create(createSongDto: any): Promise<Song> {
    const newSong = new this.songModel(createSongDto);
    return newSong.save();
  }
}