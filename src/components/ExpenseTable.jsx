import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ExpenseTable = () => {
    // Get budget state from Redux store
    const budget = useSelector((state) => state.budget);
    const expense = useSelector((state) => state.expense);
    
    const [expenses, setExpenses] = useState({
        total: 0,
        food: 0,
        travel: 0,
        entertainment: 0,
        other: 0
    });

    useEffect(() => {
        // Always calculate expenses, even if array is empty
        const expenseList = expense?.expenses || [];
        
        const total = expenseList.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const food = expenseList
            .filter(e => e.category === 'food')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
        const travel = expenseList
            .filter(e => e.category === 'travel')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
        const entertainment = expenseList
            .filter(e => e.category === 'entertainment')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
        const other = expenseList
            .filter(e => e.category === 'other')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
        
        setExpenses({
            total,
            food,
            travel,
            entertainment,
            other
        });
    }, [expense?.expenses]); // Only depend on the expenses array


    const { categoryBudget, budget: totalBudget } = budget;



  return (
    <div className='expense-table'>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Limit status</th>
            <th>Budget</th>
            <th>Expense</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>All</td>
                <td className="expense-limit">
                    <span 
                        className="status-pill" 
                        style={{ backgroundColor: totalBudget >= expenses.total ? 'var(--success-color)' : 'var(--danger-color)' }}
                    >
                        {totalBudget >= expenses.total ? 'within' : 'exceeded'}
                    </span>
                </td>
                <td>{totalBudget}</td>
                <td>{expenses.total}</td>
                <td>{totalBudget - expenses.total}</td>
            </tr>
            <tr>
                <td>Food</td>
                <td className="expense-limit">
                    <span 
                        className="status-pill" 
                        style={{ backgroundColor: categoryBudget.food >= expenses.food ? 'var(--success-color)' : 'var(--danger-color)' }}
                    >
                        {categoryBudget.food >= expenses.food ? 'within' : 'exceeded'}
                    </span>
                </td>
                <td>{categoryBudget.food}</td>
                <td>{expenses.food}</td>
                <td>{categoryBudget.food - expenses.food}</td>
            </tr>
            <tr>
                <td>Travel</td>
                <td className="expense-limit">
                    <span 
                        className="status-pill" 
                        style={{ backgroundColor: categoryBudget.travel >= expenses.travel ? 'var(--success-color)' : 'var(--danger-color)' }}
                    >
                        {categoryBudget.travel >= expenses.travel ? 'within' : 'exceeded'}
                    </span>
                </td>
                <td>{categoryBudget.travel}</td>
                <td>{expenses.travel}</td>
                <td>{categoryBudget.travel - expenses.travel}</td>
            </tr>
            <tr>
                <td>Entertainment</td>
                <td className="expense-limit">
                    <span 
                        className="status-pill" 
                        style={{ backgroundColor: categoryBudget.entertainment >= expenses.entertainment ? 'var(--success-color)' : 'var(--danger-color)' }}
                    >
                        {categoryBudget.entertainment >= expenses.entertainment ? 'within' : 'exceeded'}
                    </span>
                </td>
                <td>{categoryBudget.entertainment}</td>
                <td>{expenses.entertainment}</td>
                <td>{categoryBudget.entertainment - expenses.entertainment}</td>
            </tr>
            <tr>
                <td>Other</td>
                <td className="expense-limit">
                    <span 
                        className="status-pill" 
                        style={{ backgroundColor: categoryBudget.other >= expenses.other ? 'var(--success-color)' : 'var(--danger-color)' }}
                    >
                        {categoryBudget.other >= expenses.other ? 'within' : 'exceeded'}
                    </span>
                </td>
                <td>{categoryBudget.other}</td>
                <td>{expenses.other}</td>
                <td>{categoryBudget.other - expenses.other}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseTable
