import React from 'react'

const ExpenseForm = () => {
  return (
    <div>
      <h2>New Expense Form</h2>
      <form>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ExpenseForm
