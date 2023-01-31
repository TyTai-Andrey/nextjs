// Core
import { all, call, takeLatest } from 'redux-saga/effects';

// Types
import { peopleTypes } from './types';

// Workers
import {
  fetchPeople,
} from './workers';

function* watchFetchPeople() {
  yield takeLatest(
    peopleTypes.FETCH_PEOPLE_ASYNC,
    fetchPeople,
  );
}

export function* watchPeople() {
  yield all([
    call(watchFetchPeople),
  ]);
}
