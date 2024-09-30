import axios from "axios";
import { GET_EGAX_PRICE_ORACLE } from "../core/routes";

export const USER_TRADE_DEPOSIT = async () => {
  try {
    const response = await axios.get(
      `https://egomart.egoras.com/${GET_EGAX_PRICE_ORACLE}`
    );
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
