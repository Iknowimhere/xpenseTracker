import React from 'react'

const TransactionTable = () => {
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
            <tr>
                <td>1.</td>
                <td>Groceries</td>
                <td>Food</td>
                <td>$100</td>
                <td>
                    <button>Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TransactionTable
