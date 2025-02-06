interface ApiSuccessResponse<T> {
    status: string;
    message: string;
    payload?: T;
};

export class ResponseHandler {
    static success<T>(message: string, payload?: T): ApiSuccessResponse<T> {
        return {
            status: "success",
            message,
            payload
        };
    };
};