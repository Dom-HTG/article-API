import { Request, Response, NextFunction } from "express";

export type ExpressFunction<T = any> = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<T>; 

// this function handles asynchronous operations and catches the errors appropriately.

export const handleAsync = <T>(fn: ExpressFunction<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await fn(req, res, next);
        } catch (e) {
            next(e);
            return res;
        };
    };
};