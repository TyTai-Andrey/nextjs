// Core
import { createReducer } from '@reduxjs/toolkit';
import { FilterResult } from '@typings/base';

// Actions
import { peopleActions } from './actions';

// Typings
import { PeopleItemModel } from './interfaces';

interface InitialState {
  data: FilterResult<PeopleItemModel>;
  loading: boolean;
  error: boolean;
}

const initialState: InitialState = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: null,
  },
  loading: false,
  error: false,
};

export const peopleReducer = createReducer(initialState, (builder) => {
  builder.addCase(peopleActions.fetchPeopleRequest, (state) => {
    state.loading = true;
    state.error = false;
  });

  builder.addCase(peopleActions.fetchPeopleSuccess, (state, action) => {
    state.data = action.payload;
    state.loading = false;
    state.error = false;
  });

  builder.addCase(peopleActions.fetchPeopleFailure, (state, action) => {
    state.data = null;
    state.loading = false;
    state.error = true;
  });
});
