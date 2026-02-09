import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
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

  @Get('search')
  async search(@Query('q') query: string) {
    if (!query) return [];
    return this.songsService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Post()
  create(@Body() createSongDto: any) {
    return this.songsService.create(createSongDto);
  }
}
