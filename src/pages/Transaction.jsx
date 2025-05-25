import ExpenseForm from "../components/ExpenseForm"
import ExpenseTable from "../components/ExpenseTable"
import TransactionalFilters from "../components/TransactionalFilters"
import TransactionTable from "../components/TransactionTable"
import { useDispatch, useSelector } from "react-redux"
import { updateBudget } from "../slices/budgetSlice"
import { useNavigate } from "react-router-dom"

const Transaction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const budget = useSelector((state) => state.budget);

    const handleNewUpdateTracker = () => {
        const updatedBudget = {
            name: budget.name,
            budget: budget.budget,
            categoryBudget: {
                ...budget.categoryBudget
            }
        };
        dispatch(updateBudget(updatedBudget));
        // Navigate back to landing page
        navigate('/', { state: { isUpdate: true }});
    }

    return (
        <div>
            <div className="header">
                <h2>Umashankar's Monthly Expenditure</h2>
                <button onClick={handleNewUpdateTracker}>New/Update tracker</button>
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
