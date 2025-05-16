import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log(exception)
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()

        response.status(exception.getStatus()).send({
            message: exception.message,
            statusCode: exception.getStatus(),
            error: exception.name,
            reqUrl:request.url,
            occurreat: new Date().toDateString(),
        })
    }
}