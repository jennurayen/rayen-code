import { configureStore } from "@reduxjs/toolkit";
import AsideSlice from "./AsideSlice";

const store = configureStore(
    {
        reducer: {
            AsideSliceStore: AsideSlice,
        }
    }
)
export default store;