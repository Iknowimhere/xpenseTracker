import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./slices/budgetSlice";
import expenseReducer from "./slices/expenseSlice";

let store= configureStore({
    reducer: {
        budget: budgetReducer,
        expense: expenseReducer
    }
});

export default store;