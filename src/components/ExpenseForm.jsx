import React from 'react'
import { useDispatch } from "react-redux";
import { createExpense } from "../slices/expenseSlice.js";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExpense = {
      id: Date.now(),
      description: formData.get("name"),
      amount: parseFloat(formData.get("amount")),
      category: formData.get("category"),
    };
    dispatch(createExpense(newExpense));
    e.target.reset();
  };

  return (
    <div>
      <h2>New Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Expense name:
          <input type="text" name="name" />
        </label>
        <label>
          Expense amount:
          <input type="number" name="amount" />
        </label>
        <label>
          Select category:
          <select name="category">
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default ExpenseForm
