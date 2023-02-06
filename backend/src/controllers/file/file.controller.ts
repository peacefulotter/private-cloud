
import { Controller, Get, Query, Post, Res, UploadedFiles, UseFilters, UseInterceptors, HttpException, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

import { FileService } from './file.service';

import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import ExplorerFilter from '../../dto/ExplorerDto';
import { FOLDER_PATH } from '../../constants';

@Controller('file')
@UseFilters(new HttpExceptionFilter())
export class FileController 
{
    constructor(private readonly service: FileService) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files[]', undefined, {
        storage: diskStorage( {
            destination: (req, _, callback) => {
                const destination = FOLDER_PATH + req.body.pathname
                callback(null, destination)
            },
            filename: (_, file, callback) => {
                callback(null, file.originalname)
            },
        } ) 
    } ) )
    async upload( @UploadedFiles() files: Array<Express.Multer.File> )
    {
        return { status: 200, msg: 'ok' }
    }

    @Get('remove/one')
    async removeOne( @Query() query: { pathname: string, name: string } )
    {
        try {
            const { pathname, name } = query;
            return await this.service.removeOne(pathname, name);
        }
        catch { 
            throw new HttpException( {
                msg: 'Download failed'
            }, 403 )
        }
    }

    @Get('download/many')
    async downloadMany( @Query(new ValidationPipe({ transform: true })) filter: ExplorerFilter, @Res() res: Response )
    {
        console.log(filter);
        try {
            const { pathname, explorer } = filter;
            return await this.service.downloadMany(pathname, explorer, res);
        }
        catch (e) {
            console.log(e);
            throw new HttpException( {
                msg: 'Download files failed'
            }, 403 )
        }
    }

    @Get('remove/many')
    async removeMany( @Query() query: { pathname: string, files: string[], folders: string[] } )
    {
        try {
            const { pathname, files, folders } = query;
            return await this.service.removeMany(pathname, files, folders);
        }
        catch (e) {
            console.log(e);
            throw new HttpException( {
                msg: 'Remove files failed'
            }, 403 )
        }
    }
}