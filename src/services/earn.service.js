import { api } from "../core/AxiosInstance";
import {
  GET_USER_TRADE_VOLUME_REWARD,
  CLAIM_REWARD_ROUTE,
} from "../core/routes";

export const TRADE_VOLUME_REWARD = async (wallet) => {
  try {
    const response = await api.get(`${GET_USER_TRADE_VOLUME_REWARD}/${wallet}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
export const CLAIM_REWARD = async (wallet) => {
  try {
    const response = await api.post(`${CLAIM_REWARD_ROUTE}/${wallet}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
