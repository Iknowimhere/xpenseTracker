import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    budget: "",
    categoryBudget: {
        food: "",
        travel: "",
        entertainment: "",
        other: "",
    },
    activeFilter: 'all' // Add this new state
};

export const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        createBudget: (state, action) => {
            state.name = action.payload.name;
            state.budget = action.payload.budget;
            state.categoryBudget = {
                food: action.payload.categoryBudget.food || 0,
                travel: action.payload.categoryBudget.travel || 0,
                entertainment: action.payload.categoryBudget.entertainment || 0,
                other: action.payload.categoryBudget.other || 0,
            };
        },
        updateBudget: (state, action) => {
            state.name = action.payload.name;
            state.budget = action.payload.budget;
            state.categoryBudget = {
                food: action.payload.categoryBudget.food || 0,
                travel: action.payload.categoryBudget.travel || 0,
                entertainment: action.payload.categoryBudget.entertainment || 0,
                other: action.payload.categoryBudget.other || 0,
            };
        },
        clearAllData: (state) => {
            state.name = '';
            state.budget = "";
            state.categoryBudget = {
                food: "",
                travel: "",
                entertainment: "",
                other: ""
            };
        },
        setFilter: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
})

export const { createBudget, updateBudget, clearAllData, setFilter } = budgetSlice.actions
export default budgetSlice.reducer