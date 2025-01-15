/** @format */

import VariantsTypes from "./Variants";

// Carts
export default interface CartsTypes {
  id: string;
  product_variant_id: string;
  user_id: string;
  quantity: number;
  product_variant: VariantsTypes;
}
