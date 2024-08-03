export interface ResultResponse<T> {
    status: boolean;
    payload: T;
    error?: {
        statusCode?: number;
        path?: string;
        errorMessage?: string;
    }
}