import { api } from "../core/AxiosInstance";
import {
  FETCH_ALL_LISTED_ASSETS_ROUTES,
  GET_24_HOUR_VOLUME_ROUTE,
  GET_ALL_ORDERS_ROUTE,
  GET_ALL_TRADES_ROUTE,
  GET_DEPOSIT_TRANSACTION_ROUTES,
  GET_TICKER_PAIRS_ROUTE,
  GET_USER_TRADE_ORDERS_ROUTE,
  INSERT_NEW_ORDER_ROUTE,
  USER_TRADE_DEPOSIT_ROUTE,
  GET_USER_HISTORY,
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
export const GET_USER_DEPOSIT_WITHDRAW = async (wallet) => {
  try {
    const response = await api.get(`${GET_USER_HISTORY}/${wallet}`);
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
export const GET_EXCHANGE_TRADES = async () => {
  try {
    const response = await api.get(`${GET_ALL_TRADES_ROUTE}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
export const INSERT_NEW_ORDER = async (payload) => {
  try {
    const response = await api.post(`${INSERT_NEW_ORDER_ROUTE}`, payload);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
// halle
export const GET_24_HOUR_VOLUME = async (ticker) => {
  try {
    const response = await api.get(`${GET_24_HOUR_VOLUME_ROUTE}/${ticker}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
export const GET_ALL_DEPOSIT_TRANSACTION = async ({ account }) => {
  try {
    const response = await api.get(
      `${GET_DEPOSIT_TRANSACTION_ROUTES}/${account}`
    );
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
export const FETCH_ALL_LISTED_ASSETS = async () => {
  try {
    const response = await api.get(`${FETCH_ALL_LISTED_ASSETS_ROUTES}`);
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.response || error.message;
  }
};
