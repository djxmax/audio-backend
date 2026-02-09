import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Playlist } from './playlist.schema';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>,
  ) {}

  async create(name: string, description?: string) {
    const newPlaylist = new this.playlistModel({
      name,
      description,
      songs: [],
    });
    return newPlaylist.save();
  }

  async findAll() {
    return this.playlistModel.find().exec();
  }

  async search(query: string) {
    const searchRegex = new RegExp(query, 'i');

    return this.playlistModel
      .find({
        $or: [{ name: searchRegex }],
      })
      .exec();
  }

  async findOne(id: string) {
    const playlist = await this.playlistModel
      .findById(id)
      .populate('songs') // On récupère les objets Song complets
      .exec();

    if (!playlist) throw new NotFoundException('Playlist introuvable');
    return playlist;
  }

  async addSongToPlaylist(playlistId: string, songId: string) {
    const updatedPlaylist = await this.playlistModel
      .findByIdAndUpdate(
        playlistId,
        { $addToSet: { songs: new Types.ObjectId(songId) } }, // Évite les doublons
        { new: true },
      )
      .populate('songs');

    if (!updatedPlaylist) throw new NotFoundException('Playlist introuvable');
    return updatedPlaylist;
  }

  async removeSongFromPlaylist(playlistId: string, songId: string) {
    return this.playlistModel
      .findByIdAndUpdate(
        playlistId,
        { $pull: { songs: new Types.ObjectId(songId) } },
        { new: true },
      )
      .populate('songs');
  }
}
