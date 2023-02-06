
import AdmZip from 'adm-zip';
import { Response } from 'express';
import promises from 'fs/promises';

import { Explorer } from '../../types';
import { FOLDER_PATH } from '../../constants';

export class FileService 
{
    constructor() {}

    remove = (pathname: string, file: string) => promises.unlink(FOLDER_PATH + pathname + file)

    async removeOne(pathname: string, file: string) {
        return await this.remove(pathname, file)
    }

    async downloadMany(pathname: string, explorer: Explorer, res: Response) 
    {
        const zip = new AdmZip();
        console.error('FOLDER NOT SUPPORTED')
        explorer.forEach( ({name}) => zip.addLocalFile(FOLDER_PATH + pathname + name) )
        const buffer: Buffer = zip.toBuffer();

        res.writeHead( 200, {
            'Content-Disposition': `attachment; filename='files.zip'`,
            'Content-Type': 'application/zip',
        } );
        return res.end(buffer)
    }

    async removeMany(pathname: string, files: string[], folders: string[]) 
    {
        return await Promise.all( 
            files.map( file => this.remove(pathname, file) )
        )
    }
}