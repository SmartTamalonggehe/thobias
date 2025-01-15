/** @format */

import { User } from ".";
import OrderItemsTypes from "./OrderItems";
import ReviewsTypes from "./Reviews";
import ShippingCostsTypes from "./ShippingCosts";
import ShippingStatusesTypes from "./ShippingStatuses";

// orders
export default interface OrdersTypes {
  id: string;
  user_id: string;
  shpipping_cost_id: string;
  total_price: number;
  total_payment: number;
  status: string;
  address: string;
  order_items: OrderItemsTypes[];
  snap_token: string;
  created_at: string;
  shipping_cost: ShippingCostsTypes;
  shipping_status?: ShippingStatusesTypes;
  review: ReviewsTypes[];
  user: User;
}
