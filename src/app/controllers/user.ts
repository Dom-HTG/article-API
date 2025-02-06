import { Request, Response, NextFunction } from "express";
import { prisma } from "../../infrastructure/database";
import { IUserController } from "../../interfaces/user";
import { CreateUserDTO, ResetPasswordRequestDTO, UserDTO } from "../dto/dto";
import { UserService } from "../services/user";
import { ResponseHandler } from "../../infrastructure/utility/response-handler";
import { handleAsync } from "../../infrastructure/utility/handle-async";
// const healthcheck = (_req: Request, res: Response) => {
//     res.status(200).json({ message: "Check complete. Server is healthy and running" });
// };

export class UserController implements IUserController {
    private readonly userService: UserService; 

    constructor(userService: UserService) {
        this.userService = userService;
    }; // init dependency.

    createUser = handleAsync(
        async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
            const user = req.body;
            const createdUser = await this.userService.createUser(user);
            return res.status(201).json(ResponseHandler.success("user created successfully", createdUser));
        }
    );

    async retrieveUserById(): Promise<UserDTO> {
        
    };

    async retrieveUserByEmail(email: string): Promise<UserDTO> {
        
    };

    async retrieveAllUsers(): Promise<UserDTO[]> {
        
    };

    async updateUserProfile(): Promise<UserDTO> {
        
    };

    async removeUser(): Promise<UserDTO> {
        
    };

    async forgotPassword(email: string): Promise<boolean> {
        
    }

    async changePassword(pass: ResetPasswordRequestDTO): Promise<boolean> {
        
    };
};


const creatUser = async (req: Request, res: Response) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                fullname: req.body.fullname,
                email: req.body.email,
            }
        });

        res.status(201).json({
            message: "User entity created successfully",
            payload: newUser
        });

    } catch (e: any) {
        console.error(e.message);
        res.status(500).json({
            message: " Internal Server Error",
            payload: e.message
        });
    };
};

const allUsers = async (_req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            console.log("No users found");
        }

        res.status(200).json({
            message: "All users retrieved",
            payload: users
        });

    } catch (e: any) {
        console.error(e);
        res.status(500).json({
            message: "Internal Server Error",
            payload: e.message
        });
    }
};

export { healthcheck, creatUser, allUsers };