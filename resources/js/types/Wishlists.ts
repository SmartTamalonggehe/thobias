import ProductsTypes from "./Products";

// wishlists
export default interface WishlistsTypes {
    id: string;
    product_id: string;
    user_id: string;
    product: ProductsTypes;
}
