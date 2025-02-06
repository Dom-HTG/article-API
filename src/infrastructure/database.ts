import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

class Database {
    // This instantiates a database connection using the prisma ORM.

    constructor() { 
        if (!prisma) {
            prisma = new PrismaClient(); // initializes a prisma client if it doesn't already exist..
        }
    }

    async init() {
        // Method to initialize a connection to the database.
        try {
            await prisma.$connect();
            console.log('Prisma: Connected to the postgresql database');

        } catch (error: any) {
            console.error(`Prisma Could not connect to the postgresql database: ${error.message}`);
            process.exit(1);
        };
    };

    async disconnect() {
        // Method to terminate a database connection.
        try {
            await prisma.$disconnect();
            console.log('Prisma: Database disconnected');

        } catch (error: any) {
            console.error(`Prisma: Unable to disconnect from the postgresql database: ${error.message}`);

        };
    };
}

export { Database, prisma };