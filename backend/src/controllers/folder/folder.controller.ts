

import { Controller, Get, HttpException, HttpStatus, Query, UseFilters } from '@nestjs/common';
import { FolderService } from './folder.service';

import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('folder')
@UseFilters(new HttpExceptionFilter())
export class FolderController 
{
    constructor(private readonly service: FolderService) {}

    @Get('read')
    async read( @Query() query: { pathname: string } )
    {
        const { pathname } = query;
        try {
            return await this.service.read( pathname )
        }
        catch {
            const msg = `Reading folder ${decodeURI(pathname)} failed`
            throw new HttpException(msg, HttpStatus.NOT_FOUND )
        }
    }

    @Get('create')
    async create( @Query() query: { pathname: string, name: string } )
    {
        try {
            const { pathname, name } = query;
            return await this.service.create(pathname, name);
        } 
        catch (e) {
            throw new HttpException('create failed', 403)
        }
    }

    @Get('rename')
    async rename( @Query() query: { pathname: string, oldName: string, newName: string } )
    {
        try {
            const { pathname, oldName, newName } = query;
            return await this.service.rename(pathname, oldName, newName);
        } 
        catch (e) {
            throw new HttpException('rename failed', 403)
        }
    }
}