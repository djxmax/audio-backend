import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('songs') 
@UseGuards(ApiKeyGuard)
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get() 
  findAll() {
    return this.songsService.findAll();
  }

  @Post() 
  create(@Body() createSongDto: any) {
    return this.songsService.create(createSongDto);
  }
}