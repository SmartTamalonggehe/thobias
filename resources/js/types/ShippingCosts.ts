/** @format */

import SubDistrictsTypes from "./SubDistricts";

export default interface ShippingCostsTypes {
  id: string;
  sub_district_id: string;
  village_nm: string;
  shipping_cost: number;
  sub_district: SubDistrictsTypes;
}
