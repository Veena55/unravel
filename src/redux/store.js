import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./slices/roomSlice";

const store = configureStore({
    reducer: {
        rooms: roomReducer
    }
});

export default store;