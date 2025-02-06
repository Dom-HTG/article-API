import { Request, Response, NextFunction } from "express";

export type ExpressFunction<T> = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<T>; 

// this function handles asynchronous operations and catches the errors appropriately.

export const handleAsync = <T>(fn: ExpressFunction<T>) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Promise.resolve(fn(req, res, next)).catch((e) => next(e));
}