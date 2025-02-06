import { Request, Response, NextFunction } from 'express';
import { ErrorResponseDTO } from '../../app/dto/dto';
import { ApiError } from './api-error';
export const HandleError = () => {
    return (
        e: Error | ApiError,
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {

                const errorResponse: ErrorResponseDTO = {
                    statusCode: e instanceof ApiError ? e.statusCode : 500,
                    message: e.message || "Internal Server Error",
                    timestamp: new Date().toISOString(),
                    
                };
                
                if(process.env.NODE_ENV === "development") {
                    errorResponse.stack = e.stack;
                    errorResponse.path = req.path;
                    errorResponse.method = req.method;
                };


            return res.status(errorResponse.statusCode).json(errorResponse);
    };
};