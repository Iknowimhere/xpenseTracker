import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import BudgetForm from "../components/BudgetForm"

const Landing = () => {
    const location = useLocation();
    const budget = useSelector((state) => state.budget);
    const isUpdate = location.state?.isUpdate;

    const initialFormData = isUpdate ? {
        name: budget.name,
        budget: budget.budget,
        food: budget.categoryBudget.food,
        travel: budget.categoryBudget.travel,
        entertainment: budget.categoryBudget.entertainment,
        other: budget.categoryBudget.other
    } : null;

    return (
        <div>
            <BudgetForm initialData={initialFormData} isUpdate={isUpdate} />
        </div>
    )
}

export default Landing
