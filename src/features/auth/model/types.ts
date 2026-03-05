export interface RegisterParams {
    id: 0;
    email: string;
    nickname: string;
    password: string;
}

export interface RegisterResponse {
    id: 0;
    email: string;
    nickname: string;
    created_at: string;
    updated_at: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: 0;
    email: string;
    nickname: string;
    created_at: string;
    updated_at: string;
}
