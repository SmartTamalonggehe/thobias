/** @format */

import ShippingCostsTypes from "./ShippingCosts";

// userInfo
export default interface UserInfoTypes {
  id: string;
  user_id: string;
  shipping_cost_id: string;
  shipping_cost: ShippingCostsTypes;
  nm_user: string;
  phone_number: string;
  address: string;
  is_active: boolean;
}
