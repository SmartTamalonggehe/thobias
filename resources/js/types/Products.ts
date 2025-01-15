/** @format */

import CategoriesTypes from "./Categories";
import OrderItemsTypes from "./OrderItems";
import ProductImagesTypes from "./ProductImages";
import ReviewsTypes from "./Reviews";
import VariantsTypes from "./Variants";

// Products
export default interface ProductsTypes {
  id: string;
  category_id: string;
  product_nm: string;
  category: CategoriesTypes;
  product_image: ProductImagesTypes[];
  review: ReviewsTypes[];
  order_item: OrderItemsTypes[];
  product_variants: VariantsTypes[];
}
