export interface UserAuthResponse {
    _id: string,
    email: string,
    token: string,
    hashedId: string
}

export interface UserGetInterface {
    _id: string,
    username: string,
    email: string,
    role: string,
    createdAt: string,
    updatedAt: string
}