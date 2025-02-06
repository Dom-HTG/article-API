export class ApiError extends Error {
    
    constructor(
        public message: string,
        public statusCode: number = 500, // default to INTERNAL_SERVER_ERROR: 500
        public isOperational: boolean = true, // default to true.
        public errorPayload: string = "" // defaults to empty.
    ) {
        super(message);
        if (process.env.NODE_ENV !== 'development') { // add stack trace if in development mode.
            Error.captureStackTrace(this, this.constructor);
            this.errorPayload = errorPayload;
        };
        
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.name = this.constructor.name;

        Object.setPrototypeOf(this, ApiError.prototype); // Set the prototype explicitly for TypeScript (important for extending Error in TypeScript)
    };
};