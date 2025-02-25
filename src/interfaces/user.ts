import { CreateUserDTO, ResetPasswordRequestDTO, UserDTO } from "../app/dto/dto";
import { Request, Response, NextFunction } from "express";

// defines contracts for each layer of the user entity.

export interface IUserController {
    createUser(req: Request, res: Response, next: NextFunction): Promise<Response>;
    retrieveUserById(req: Request, res: Response, next: NextFunction): Promise<Response>;
    retrieveUserByEmail(req: Request, res: Response, next: NextFunction): Promise<Response>;
    retrieveAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response>;
    updateUserProfile(req: Request, res: Response, next: NextFunction): Promise<Response>;
    removeUser(req: Request, res: Response, next: NextFunction): Promise<Response>;
    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<Response>; // returns true if successful.
    changePassword(req: Request, res: Response, next: NextFunction): Promise<Response>; // returns true if password reset is successful.
};

export interface IUserService {
    createUser(user: CreateUserDTO): Promise<Omit<UserDTO, "password">>;
    retrieveUserById(id: string): Promise<UserDTO>;
    retrieveUserByEmail(email: string): Promise<UserDTO>;
    retrieveAllUsers(): Promise<UserDTO[]>;
    updateUserProfile(): Promise<UserDTO>;
    removeUser(): Promise<UserDTO>;
    forgotPassword(email: string): Promise<boolean>;
    changePassword(pass: ResetPasswordRequestDTO): Promise<boolean>;
};

export interface IUserRepository {
    createUser(user: CreateUserDTO): Promise<Omit<UserDTO, "password">>;
    retrieveUserById(id: string): Promise<UserDTO>;
    retrieveUserByEmail(email: string): Promise<UserDTO>;
    retrieveAllUsers(): Promise<UserDTO[]>;
    updateUserProfile(): Promise<UserDTO>;
    removeUser(): Promise<UserDTO>;
    forgotPassword(email: string): Promise<boolean>;
    changePassword(pass: ResetPasswordRequestDTO): Promise<boolean>;
};