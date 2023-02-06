import { MulterModule } from '@nestjs/platform-express';
import path from 'path'

export const FOLDER_PATH = path.resolve(process.cwd(), 'public/files')
export const CREATE_FOLDER_MODE = 484