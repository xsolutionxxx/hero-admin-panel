// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useDispatch, useSelector } from "react-redux";
// import { activeFilterChanged } from "../../actions";
import { activeFilterChanged, selectAll } from "./filtersSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { activeFilter, filtersLoadingStatus } = useSelector(
    (state) => state.filters,
  );
  const filters = useSelector(selectAll);
  const dispatch = useDispatch();

  const onFilterClick = (id) => {
    dispatch(activeFilterChanged(id));
  };

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

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
