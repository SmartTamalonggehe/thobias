/** @format */

import OrdersTypes from "./Orders";
import VariantsTypes from "./Variants";

// orderItems
export default interface OrderItemsTypes {
  id: string;
  product_variant_id: string;
  user_id: string;
  order_id: string;
  quantity: number;
  total_price: number;
  product_variant: VariantsTypes;
  order: OrdersTypes;
}
