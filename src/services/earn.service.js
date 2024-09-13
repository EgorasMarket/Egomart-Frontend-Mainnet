import { api } from "../core/AxiosInstance";
import { GET_USER_TRADE_VOLUME_REWARD } from "../core/routes";

export const USER_TRADE_DEPOSIT = async (wallet) => {
  try {
    const response = await api.get(`${GET_USER_TRADE_VOLUME_REWARD}/${wallet}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
