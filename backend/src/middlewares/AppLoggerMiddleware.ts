import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware 
{
	private logger = new Logger('HTTP');

	use( { method, baseUrl}: Request, response: Response, next: NextFunction): void 
	{
		response.on('close', () => {
			const { statusCode } = response;
			const contentLength = response.get('content-length');

			this.logger.log(
				`${method} ${baseUrl} ${statusCode} ${contentLength}`
			);
		} );

		next();
	}
}