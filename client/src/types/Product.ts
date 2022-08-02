export interface IProduct {
  name: string;
  id: number;
  url: string;
  price: number;
  description: string;
  category: string;
}

export interface ICartItem {
  id: string;
  quantity: number;
  product: IProduct;
}

export interface IFetchProductsApiResponse {
  products: IProduct[];
}

export interface INewOrder {
  userId: string | undefined;
  productId: number;
}
