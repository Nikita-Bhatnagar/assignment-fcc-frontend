import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./Reducers/authReducer";
import { reducer as courseReducer } from "./Reducers/courseReducer";

const store = configureStore({
  reducer: {
    //products: productsReducer,
    auth: authReducer,
    course: courseReducer,
  },
});
export default store;
