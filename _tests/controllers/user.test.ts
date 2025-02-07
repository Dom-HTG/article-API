// defines test suites for the user repository layer.
import UserRepository from '../../src/app/repositories/user';
import { CreateUserDTO, UserDTO } from '../../src/app/dto/dto';


import { describe, test, expect } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

describe('User-Repository', () => {
    let userRepository: UserRepository;
    let prisma: PrismaClient;

    // create a mock for the prisma client.
    const mockPrismaClient = {
        user: {
            create: jest.fn()
        }
    };

    // instantiate the repository layer.
    beforeEach(() => {
        userRepository = new UserRepository(mockPrismaClient as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should be defined', () => {
        expect(userRepository).toBeDefined();
    });

    test('should save a user and return a user without password', async () => {
        // Arrange.
        const mockUser: CreateUserDTO = {
            email: 'johndoe@mockmail.com',
            fullname: 'John Doe',
            password: 'johndoesecurepassword'
        };

        const prismaUser: UserDTO = {
            id: 1,
            email: 'johndoe@mockmail.com',
            fullname: 'John Doe',
            password: 'johndoesecurepassword'
        };

        // mock prisma response.
        mockPrismaClient.user.create.mockResolvedValue(prismaUser);

        // Act.
        const savedMockUser = await userRepository.createUser( mockUser );

        // Assert.
        expect(savedMockUser).toBeDefined();
        expect(savedMockUser.id).toBeDefined();
        expect(savedMockUser.email).toBeDefined();
        expect(mockPrismaClient.user.create).toHaveBeenCalledTimes(1);
        expect(mockPrismaClient.user.create).toHaveBeenCalledWith({data: mockUser});
        expect(savedMockUser).toEqual(prismaUser);
    
    });
});