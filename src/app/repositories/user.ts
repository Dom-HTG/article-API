import { PrismaClient, User } from "@prisma/client";
import { prisma } from "../../infrastructure/database";
import { CreateUserDTO, UserDTO } from "../dto/dto";
import { handleAsync } from "../../infrastructure/utility/handle-async";


class UserRepository {
    // database instance.
    // private prisma: PrismaClient;

    constructor(private readonly prisma: PrismaClient) {
        // this.prisma = prisma;
    };

    
    async createUser(user: CreateUserDTO): Promise<Omit<UserDTO, "password">> {
       
        const prismaUser = await this.prisma.user.create({ data: user });
        const newUser: Omit<UserDTO, "password"> = {
            id: prismaUser.id,
            fullname: prismaUser.fullname,
            email: prismaUser.email,
        };

        return newUser;
    };
};

export default UserRepository;