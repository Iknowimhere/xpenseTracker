import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBudget } from "../slices/budgetSlice.js";
import { useNavigate } from "react-router-dom";
const BudgetForm = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    food: '',
    travel: '',
    entertainment: '',
    other: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, budget, food, travel, entertainment } = formData;
    if (!name || budget <= 0 || food < 0 || travel < 0 || entertainment < 0) {
      enqueueSnackbar("Please fill in all fields correctly.", { variant: "error" });
      return;
    }
    const categoryBudget = {
      food: parseFloat(food),
      travel: parseFloat(travel),
      entertainment: parseFloat(entertainment),
      other: parseFloat(formData.other) || 0
    };
    if(categoryBudget.food + categoryBudget.travel + categoryBudget.entertainment > budget) {
      enqueueSnackbar("Total Categorical budget should not exceed monthly budget", { variant: "error" });
      return;
    }
    if(categoryBudget.food + categoryBudget.travel + categoryBudget.entertainment < budget) {
      categoryBudget.other = budget - (categoryBudget.food + categoryBudget.travel + categoryBudget.entertainment);
    }
    
    if(categoryBudget.food < 0 || categoryBudget.travel < 0 || categoryBudget.entertainment < 0 || categoryBudget.other < 0) {
      enqueueSnackbar("Category budgets cannot be negative.", { variant: "error" });
      return;
    }

    dispatch(createBudget({ name, budget, categoryBudget }));
    enqueueSnackbar("Budget created successfully!", { variant: "success" });
    setFormData({
      name: '',
      budget: '',
      food: '',
      travel: '',
      entertainment: '',
      other: ''
    });
    navigate('/tracker');
  }
  return (
    <div>
      <h2>Welcome to your own Expense Tracker</h2>
      <p>Please fill in the form below to start tracking</p>
      <form>
        <div>
          <label htmlFor="description">Enter your name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="budget">Enter your monthly budget</label>
          <input type="number" name="budget" value={formData.budget} onChange={handleChange} />
        </div>
        <div className="category-table">
            <p>Fill in your monthly categorical budget</p>
            <table>
                <thead>
                    <tr>
                    <th>Food</th>
                    <th>Travel</th>
                    <th>Entertainment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <input type="number" name="food" value={formData.food} onChange={handleChange} />
                    </td>
                    <td>
                        <input type="number" name="travel" value={formData.travel} onChange={handleChange} />
                    </td>
                    <td>
                        <input type="number" name="entertainment" value={formData.entertainment} onChange={handleChange} />
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default BudgetForm
