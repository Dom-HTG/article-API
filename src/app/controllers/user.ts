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

    constructor(private readonly _userService: UserService) {}; // init dependency.

    public createUser = handleAsync(
        async (
            req: Request, 
            res: Response, 
            next: NextFunction
        ): Promise<Response> => {
            const user: CreateUserDTO = req.body;
            const createdUser = await this._userService.createUser(user);
            return res.status(201).json(ResponseHandler.success("user created successfully", createdUser));
        }
    );

    retrieveUserById = handleAsync(
        async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const id = req.params.id; // get ID.
        const user = await this._userService.retrieveUserById(id);
        return res.status(200).json(ResponseHandler.success("user retrieved successfully", user));
    });

    public retrieveUserByEmail =  handleAsync(
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<Response> => {
        const email = req.body.email;
        // perform validation on the provided email

        const user = await this._userService.retrieveUserByEmail(email);

        return res.status(200).json(ResponseHandler.success("user retrieved successfully", user));
    });

    public retrieveAllUsers = handleAsync(
        async (
            _req: Request,
            res: Response,
            next: NextFunction
        ): Promise<Response> => {
        const allUsers = await this._userService.retrieveAllUsers();
        return res.status(200).json(ResponseHandler.success("All users retrieved successfully", allUsers));
    });

    public updateUserProfile = handleAsync(
        async(
            req: Request,
            res: Response,
            next: NextFunction 

    ): Promise<Response> => {
        const updateData: Partial<UserDTO> = req.body;

        const updatedUser = await this.
    })

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