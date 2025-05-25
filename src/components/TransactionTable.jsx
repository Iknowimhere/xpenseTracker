import { useSelector, useDispatch } from "react-redux"
import { deleteExpense } from "../slices/expenseSlice";

const TransactionTable = () => {
  const transactions = useSelector((state) => state.expense.expenses);
  const activeFilter = useSelector((state) => state.budget.activeFilter);
  const dispatch = useDispatch();

  const filteredTransactions = transactions?.filter(transaction => {
    if (activeFilter === 'all') return true;
    return transaction.category === activeFilter;
  });

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <div className='transaction-table'>
      <table>
        <thead>
          <tr>
            <th>sl no</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
