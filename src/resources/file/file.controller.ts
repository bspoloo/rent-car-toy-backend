import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { join } from 'path';
import { createReadStream, existsSync, statSync } from 'fs';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get('images/:folder/:filename')
  public async getImageFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
    @Query('width') width?: string,
    @Query('height') height?: string,
  ): Promise<Response<any, Record<string, any>>> {

    const imagePath = join(__dirname, '..', '..', folder, 'images', filename);

    if (!existsSync(imagePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const stats = statSync(imagePath);
    res.setHeader('Content-Length', stats.size);

    const ext = filename.split('.').pop()!.toLowerCase();
    const mimeType = this.getMimeType(ext);

    res.setHeader('Content-Type', mimeType);
    return createReadStream(imagePath).pipe(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }

  private getMimeType(extension: string): string {
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'ico': 'image/x-icon'
    };

    return mimeTypes[extension] || 'image/jpeg';
  }
}
