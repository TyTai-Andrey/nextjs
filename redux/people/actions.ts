// Core
import { createAction } from '@reduxjs/toolkit';
import { BaseParams, FilterResult } from '@typings/base';
import { PeopleItemModel } from './interfaces';

// Types
import { peopleTypes } from './types';

export const peopleActions = {
  // Sync
  fetchPeopleRequest: createAction(peopleTypes.FETCH_PEOPLE_REQUEST),

  fetchPeopleSuccess: createAction(
    peopleTypes.FETCH_PEOPLE_SUCCESS,
    (data: FilterResult<PeopleItemModel>) => ({ payload: data }),
  ),

  fetchPeopleFailure: createAction(peopleTypes.FETCH_PEOPLE_FAILURE),

  // Async
  fetchPeopleAsync: createAction(
    peopleTypes.FETCH_PEOPLE_ASYNC,
    (filter?: BaseParams) => ({
      payload: filter,
    }),
  ),
};
