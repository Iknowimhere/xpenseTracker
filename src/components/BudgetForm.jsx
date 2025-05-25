import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBudget, clearAllData } from "../slices/budgetSlice.js";
import { useNavigate } from "react-router-dom";

const BudgetForm = ({ initialData, isUpdate }) => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUpdateButtons, setShowUpdateButtons] = useState(true);
  
  const [formData, setFormData] = useState(initialData || {
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

  const handleStartNewTracker = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to start a new tracker? This will delete all previous transactions and budget data."
    );

    if (isConfirmed) {
      dispatch(clearAllData());
      setShowUpdateButtons(false);
      enqueueSnackbar("Started new tracker! Previous data has been cleared.", { variant: "info" });
    }
  };

  const handleGoBack = () => {
    navigate('/tracker');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{showUpdateButtons && isUpdate ? 'Update Budget' : 'Create Budget'}</h2>
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
      <div className="button-group">
        <button type="submit">
          {showUpdateButtons && isUpdate ? 'Update' : 'Create'}
        </button>
        {showUpdateButtons && isUpdate && (
          <>
            <button type="button" onClick={handleStartNewTracker}>
              Start New Tracker
            </button>
            <button type="button" onClick={handleGoBack}>
              Go Back
            </button>
          </>
        )}
      </div>
    </form>
  )
}

export default BudgetForm
