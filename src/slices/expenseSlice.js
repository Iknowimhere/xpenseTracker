import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    expenses: [],
    totalExpense: 0,
    };

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        createExpense: (state, action) => {
            state.expenses.push(action.payload);
            state.totalExpense += action.payload.expenseAmount;
        },
        updateExpense: (state, action) => {
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
            if (index !== -1) {
                state.totalExpense -= state.expenses[index].expenseAmount;
                state.expenses[index] = action.payload;
                state.totalExpense += action.payload.expenseAmount;
            }
        },
        clearExpenseData: (state) => {
            state.expenses = [];
            state.totalExpense = 0;
        },
        deleteExpense: (state, action) => {

            state.expenses = state.expenses.filter(expense =>{ 
                return expense.id === action.payload.id
            });
            if (state.expenses.length > 0) {
                state.totalExpense -= state.expenses[0].expenseAmount;
                state.expenses.splice(0, 1);
            } else {
                console.warn(`Expense with id ${action.payload.id} not found.`);
            }

        }
    }
    }
);

export const { createExpense, updateExpense, clearExpenseData, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
