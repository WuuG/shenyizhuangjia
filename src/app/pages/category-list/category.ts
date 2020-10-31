export interface Category {
    id: number;
    name: string;
    childern: Array<Category>;
}
