import { createSlice } from '@reduxjs/toolkit'

// Load initial state from localStorage if exists
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('budgetState');
    if (serializedState === null) {
      return {
        name:'',
        budget:0,
        categoryBudget: {
          food: 0,
          travel: 0,
          entertainment: 0,
          other: 0,
        },
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      name:'',
      budget:0,
      categoryBudget: {
        food: 0,
        travel: 0,
        entertainment: 0,
        other: 0,
      },
    };
  }
};

const initialState = loadState();

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    createBudget: (state, action) => {
        console.log("action.payload", action.payload);
        
        state.name = action.payload.name;
        state.budget = action.payload.budget;
        state.categoryBudget = {
          food:    action.payload.categoryBudget.food || 0,
          travel:  action.payload.categoryBudget.travel || 0,
          entertainment: action.payload.categoryBudget.entertainment || 0,
          other:   action.payload.categoryBudget.other || 0,
        };
        // Save to localStorage whenever state changes
        localStorage.setItem('budgetState', JSON.stringify(state));
    },
  },
})

export const { createBudget } = budgetSlice.actions
export default budgetSlice.reducer