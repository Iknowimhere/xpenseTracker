import { useSelector } from "react-redux"
const ExpenseTable = () => {
  const expenses = useSelector((state) => state.expenses);
  console.log(expenses);
  
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
            <td>Food</td>
            <td>within</td>
            <td>3000</td>
            <td>200</td>
            <td>2800</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseTable
