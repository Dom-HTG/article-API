export interface UserDTO {
    id: number;
    email: string;
    fullname: string;
    password: string;
    articles?: articleDTO[];
};

export interface CreateUserDTO {
    email: string;
    fullname: string;
    password: string;
};

export interface UpdatedUserDTO {

}

export interface articleDTO {
    id: string;
    title: string;
    body?: string;
    authorId: number;
    author: UserDTO;
};

export interface ErrorResponseDTO {
    statusCode: number;
    message: string;
    stack?: string;
    error_payload?: string;
    timestamp?: string;
    path?: string;
    method?: string;
};

export interface ResetPasswordRequestDTO {
    oldPassword: string;
    newPassword: string;
};

export interface ForgotPasswordRequestDTO {
    email: string;
};