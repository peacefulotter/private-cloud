import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import express from "express";
import { HttpExceptionFilter } from './filters/http-exception.filter';

import { FOLDER_PATH } from './constants';

declare const module: any;

async function bootstrap()
{
	const app = await NestFactory.create( AppModule );

	app.enableCors();
	app.useGlobalFilters( new HttpExceptionFilter() );

	app.use( express.static( FOLDER_PATH ) );

	await app.listen(3001);

	if ( module.hot ) 
    {
		module.hot.accept();
		module.hot.dispose( app.close );
	}
}

bootstrap();