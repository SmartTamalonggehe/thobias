/** @format */

import OrderItemsTypes from "./OrderItems";
import ProductImagesTypes from "./ProductImages";
import ProductsTypes from "./Products";
import ReviewsTypes from "./Reviews";

// Variants
export default interface VariantsTypes {
  id: string;
  product_id: string;
  attribute_nm: string;
  variant_nm: string;
  price: number;
  stock: number;
  description: string;
  product: ProductsTypes;
  product_variant_images: ProductImagesTypes[];
  review: ReviewsTypes[];
  order_item: OrderItemsTypes[];
}
