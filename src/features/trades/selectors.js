import { createSelector } from "@reduxjs/toolkit";

export const selectRecordByCriteria = createSelector(
  [
    selectRecords,
    (state, price, ticker, address) => ({ price, ticker, address }),
  ],
  (records, criteria) =>
    records.find(
      (record, index) =>
        record.price === criteria.price &&
        record.ticker === criteria.ticker &&
        record.address === criteria.address &&
        index === criteria.indexId
    )
);
