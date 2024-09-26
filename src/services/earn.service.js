import { api } from "../core/AxiosInstance";
import {
  GET_USER_TRADE_VOLUME_REWARD,
  GET_USER_TRADE_VOLUME_LEADERBOARD,
  CLAIM_REWARD_ROUTE,
  GET_USER_LOCKED_FUNDS,
  GET_BONDING_DATA,
} from "../core/routes";

export const TRADE_VOLUME_REWARD = async (wallet) => {
  try {
    const response = await api.get(`${GET_USER_TRADE_VOLUME_REWARD}/${wallet}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
export const TRADE_VOLUME_LEADERBOARD = async () => {
  try {
    const response = await api.get(`${GET_USER_TRADE_VOLUME_LEADERBOARD}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};

export const USER_LOCKED_FUNDS = async (wallet) => {
  try {
    const response = await api.get(`${GET_USER_LOCKED_FUNDS}/${wallet}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
export const BONDING_DATA = async () => {
  try {
    const response = await api.get(`${GET_BONDING_DATA}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};

export const CLAIM_REWARD = async (wallet) => {
  try {
    const response = await api.get(`${CLAIM_REWARD_ROUTE}/${wallet}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
