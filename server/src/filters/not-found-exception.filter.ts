import * as path from 'path';
import { Catch, NotFoundException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import {Response} from 'express'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter<NotFoundException> {
    catch(exception: NotFoundException, host: ArgumentsHost ) {
        const res = host.switchToHttp().getResponse<Response>()
        res.sendFile(path.resolve(__dirname, '../../../client/build/index.html'))
    }
}