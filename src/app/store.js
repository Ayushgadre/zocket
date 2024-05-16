import { configureStore } from '@reduxjs/toolkit';
import adReducer from './adSlice';

// Configure the Redux store
export const store = configureStore({
    // Specify the reducer for the store
    reducer: {
        ad: adReducer // The adReducer manages the state for the 'ad' slice
    }
});
