import { PrismaClient, User } from "@prisma/client";
// import { prisma } from "../../infrastructure/database";
import { CreateUserDTO, UserDTO } from "../dto/dto";
import { IUserRepository } from "../../interfaces/user";
// import { handleAsync } from "../../infrastructure/utility/handle-async";


class UserRepository implements IUserRepository {
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

    async retrieveAllUsers(): Promise<UserDTO[]> {
        
        const prismaUsers: UserDTO[] = await this.prisma.user.findMany();

        return prismaUsers;
    }
};

export default UserRepository;