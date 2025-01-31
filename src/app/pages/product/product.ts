export interface Product {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    category: any;
    barcode: string;
    images: string[];
    price: number;
    purchasePrice: number;
    inventory: number;
    standard: string;
    remarks: string;
}
