import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../slices/budgetSlice';

const TransactionalFilters = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.budget.activeFilter);

  const handleFilterClick = (filter) => {
    dispatch(setFilter(filter.toLowerCase()));
  };

  const filters = ['All', 'Food', 'Travel', 'Entertainment', 'Other'];

  return (
    <div>
      <p>Filters</p>
      <div className="filters">
        {filters.map(filter => (
          <span 
            key={filter}
            className={`filter ${activeFilter === filter.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TransactionalFilters
