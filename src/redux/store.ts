import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import { loadState, saveState } from '../utils/localStorage';
import { CoursesState } from '../interface/courses';

const PERSISTED_STATE_KEY = 'eduLibraryState';

const preloadedState = loadState<{ courses: CoursesState }>(PERSISTED_STATE_KEY);

const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
  preloadedState: preloadedState ? { courses: preloadedState.courses } : undefined,
});

store.subscribe(() => {
  saveState(PERSISTED_STATE_KEY, { courses: store.getState().courses });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
