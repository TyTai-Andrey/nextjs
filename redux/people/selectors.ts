import { RootState } from '@store/index';

export const getPeoplesReducer = (store: RootState) => store.peoples;

export const getPeoples = (store: RootState) => getPeoplesReducer(store);

export const getPeopleLoading = (store: RootState) =>
  getPeoplesReducer(store).loading;
export const getPeopleError = (store: RootState) =>
  getPeoplesReducer(store).error;

export const getPeopleData = (store: RootState) =>
  getPeoplesReducer(store).data;

export const getPeopleResult = (store: RootState) =>
  getPeopleData(store).results;
export const getPeopleTotal = (store: RootState) => getPeopleData(store).count;
