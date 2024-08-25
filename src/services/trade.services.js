import { api } from "../core/AxiosInstance";
import {
  GET_ALL_ORDERS_ROUTE,
  GET_TICKER_PAIRS_ROUTE,
  GET_USER_TRADE_ORDERS_ROUTE,
  INSERT_NEW_ORDER_ROUTE,
  USER_TRADE_DEPOSIT_ROUTE,
} from "../core/routes";

export const USER_TRADE_DEPOSIT = async (wallet) => {
  try {
    const response = await api.get(`${USER_TRADE_DEPOSIT_ROUTE}/${wallet}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};

export const GET_TICKER_PAIRS = async (wallet) => {
  try {
    const response = await api.get(`${GET_TICKER_PAIRS_ROUTE}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};

export const GET_USER_TRADE_ORDERS = async (wallet) => {
  try {
    const response = await api.get(`${GET_USER_TRADE_ORDERS_ROUTE}/${wallet}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};

export const GET_EXCHANGE_EVENT = async () => {
  try {
    const response = await api.get(`${GET_ALL_ORDERS_ROUTE}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
export const INSERT_NEW_ORDER = async (
  payload = {
    userAddress: "hhhhhhh",
    orderType: "BUY",
    amount: 900,
    numberOfShares: 7.9,
    transHash:
      "0xfebf3afd9e323f592c77df767c775602f3481385ffb87800277152e4ef17d8b5",
    time: 7865676877,
  }
) => {
  try {
    const response = await api.post(`${INSERT_NEW_ORDER_ROUTE}`, payload);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
