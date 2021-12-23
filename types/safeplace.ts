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