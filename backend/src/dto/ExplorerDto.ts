
import { Transform } from 'class-transformer';
import { IsArray } from 'class-validator';

import { Explorer } from '../types';

export default class ExplorerFilter {
    pathname: string;

    @IsArray()
    @Transform( params => {
        console.log(params);
        console.log(params.value);
        
        const explorer = params.value.map( JSON.parse )
        console.log(explorer);
        return explorer
    })
    explorer: Explorer;
}