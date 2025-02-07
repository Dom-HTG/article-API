import { IUserService } from "../../interfaces/user";
import { CreateUserDTO, ResetPasswordRequestDTO, UserDTO } from "../dto/dto";
import UserRepository  from "../repositories/user";
import * as bcrypt from 'bcryptjs';

export class UserService implements IUserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    };

    async createUser(user: CreateUserDTO): Promise<Omit<UserDTO, "password">> {
        // hash password before saving.
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        //create new user object.
        const xUser: CreateUserDTO = {
            email: user.email,
            fullname: user.fullname,
            password: hash
        };

        const newUser = await this.userRepository.createUser(xUser);
        return newUser;
    };

    async retrieveUserById(id: string): Promise<UserDTO> {
        
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
        
    };

    async changePassword(pass: ResetPasswordRequestDTO): Promise<boolean> {
        
    };
};