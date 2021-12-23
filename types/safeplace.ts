export interface SafeplaceInterface {
    _id: string,
    safeplaceId?: string,
    name: string,
    description?: string,
    city: string,
    address: string,
    coordinate?: string[],
    dayTimetable: string[],
    grade?: number,
    type: string,
    createdAt: string,
    updatedAt: string
}

export interface SafeplaceCommentsInterface {
    __v: number,
    _id: string,
    comment: string,
    createdAt: string,
    grade: number,
    safeplaceId: string,
    updatedAt: string,
    userId: string
}

export interface SafeplaceAPIResponse {
    message: string
}

export interface SafeplaceRecurringInterface {
    _id: string,
    name: string,
    address: string,
    city: string,
    coordinate?: string[],
    createdAt: string,
    updatedAt: string
}