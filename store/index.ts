// Core
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// Bus
import { rootReducer, rootSaga } from '../redux';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer(),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
