/** @format */

import { User } from ".";
import OrdersTypes from "./Orders";
import VariantsTypes from "./Variants";
// reviews
export default interface ReviewsTypes {
  id: string;
  product_variant_id: string;
  user_id: string;
  order_id: string;
  rating: string;
  comment: string;
  product_variant: VariantsTypes;
  order: OrdersTypes;
  user: User;
}
