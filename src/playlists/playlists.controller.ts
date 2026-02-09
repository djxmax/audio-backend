import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { ApiKeyGuard } from 'src/auth/api-key.guard';

@Controller('playlists')
@UseGuards(ApiKeyGuard)
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: { name: string; description?: string }) {
    return this.playlistsService.create(
      createPlaylistDto.name,
      createPlaylistDto.description,
    );
  }

  @Get()
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string) {
    if (!query) return [];
    return this.playlistsService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updatePlaylistDto: {
      name?: string;
      description?: string;
      coverUrl?: string;
    },
  ) {
    return this.playlistsService.update(id, updatePlaylistDto);
  }

  @Patch(':id/songs')
  addSong(@Param('id') id: string, @Body('songId') songId: string) {
    return this.playlistsService.addSongToPlaylist(id, songId);
  }

  @Delete(':id/songs/:songId')
  removeSong(@Param('id') id: string, @Param('songId') songId: string) {
    return this.playlistsService.removeSongFromPlaylist(id, songId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.playlistsService.delete(id);
  }
}
