export interface Manager {
    id: string,
    name: string,
    gender: string,
    phone: string,
    avartarUrl: string,
    role: string,
    status: boolean,
    wallet: {
        id: string,
        balance: number,
        status: string,
    }
}

export interface ManagerPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}