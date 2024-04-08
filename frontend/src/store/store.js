import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todoSlice';
import signinSlice from '../features/auth/signinSlice';


const rootReducer = combineReducers({
    todoSlice,
    signinSlice
})
export const store = configureStore({
    reducer: rootReducer,
})