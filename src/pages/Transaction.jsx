
import ExpenseForm from "../components/ExpenseForm"
import ExpenseTable from "../components/ExpenseTable"
import TransactionalFilters from "../components/TransactionalFilters"
import TransactionTable from "../components/TransactionTable"

const Transaction = () => {
    return (
        <div>
            <div className="header">
                <h2>Umashankar's Monthly Expenditure</h2>
                <button>New/Update tracker</button>
            </div>
            <hr />
            <ExpenseTable/>
            <hr />
            <ExpenseForm />
            <hr />
            <TransactionalFilters/>
            <hr />
            <TransactionTable/>
        </div>
    )
}

export default Transaction
