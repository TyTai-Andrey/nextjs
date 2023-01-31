// Core
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { all, call } from 'redux-saga/effects';

// Reducers
import { peopleReducer } from './people/reducer';

// Watchers
import { watchPeople } from './people/watchers';

export const rootReducer = () =>
  combineReducers({
    form: formReducer,
    peoples: peopleReducer,
  });

export function* rootSaga() {
  yield all([call(watchPeople)]);
}
