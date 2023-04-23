export interface Promotion {
    id: string,
    name: string,
    description?: string,
    discount: number,
    createAt: string,
    expiryAt: string,
    quantity: number
}

export interface PromotionPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}