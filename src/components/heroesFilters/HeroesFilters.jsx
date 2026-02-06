// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useDispatch, useSelector } from "react-redux";
import { activeFilterChanged } from "../../actions";

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onFilterClick = (id) => {
    dispatch(activeFilterChanged(id));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter heroes by element</p>
        <div className="btn-group">
          {filters.map(({ id, name, className }) => {
            const btnClass = `btn ${className} ${id === activeFilter ? "active" : ""}`;

            return (
              <button
                key={id}
                onClick={() => onFilterClick(id)}
                className={btnClass}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
