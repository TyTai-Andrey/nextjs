// Core
import { put, call } from 'redux-saga/effects';

// Actions
import { peopleActions } from './actions';

// Api
import PeopleApi from '@api/PeopleApi';
import { BaseParams, FilterResult } from '@typings/base';
import { PeopleItemModel } from './interfaces';
import { PayloadAction } from '@reduxjs/toolkit';

export function* fetchPeople(action: PayloadAction<BaseParams>) {
  yield put(peopleActions.fetchPeopleRequest());

  const filter = action.payload;

  const response: FilterResult<PeopleItemModel> = yield call(
    PeopleApi.getPeoplesList,
    filter,
  );
  if (response) {
    yield put(peopleActions.fetchPeopleSuccess(response));
  } else {
    yield put(peopleActions.fetchPeopleFailure());
  }
}
