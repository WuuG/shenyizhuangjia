import { Product } from 'src/app/pages/product/product';

export interface ProductPageResult {
    totalCount: number;
    products: Product[];
    productsCost: number ;
    productsinventory: number;
}
