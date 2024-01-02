export interface RecordBase{
    id: string,
    created: Date,
    updated: Date
}

export interface Page<T extends RecordBase>{
    page: number,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: T[]
}

export interface PageRequest{
    pageNo: number,
    size?: number,
    sort?: string,
    direction?: string
}
