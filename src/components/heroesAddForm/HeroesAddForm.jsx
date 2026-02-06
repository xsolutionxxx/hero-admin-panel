import { useEffect, useState } from "react";
import { heroCreated, filterFetched } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from "uuid";

const HeroesAddForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    element: "",
  });

  const { filters } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newHero = {
      id: uuidv4(),
      ...formData,
    };

    request(`http://localhost:3002/heroes`, "POST", JSON.stringify(newHero))
      .then(() => {
        dispatch(heroCreated(newHero));
      })
      .catch((err) => console.log(err));

    setFormData({ name: "", description: "", element: "" });
  };

  useEffect(() => {
    request(`http://localhost:3002/filters`)
      .then((data) => {
        dispatch(filterFetched(data));
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  const renderFilters = (filters) => {
    return filters.map(({ name, id }) => {
      if (id === "all") return null;
      return (
        <option key={id} value={id}>
          {name}
        </option>
      );
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          New hero name
        </label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={onValueChange}
          className="form-control"
          id="name"
          placeholder="What`s my name?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fs-4">
          Description
        </label>
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={onValueChange}
          className="form-control"
          id="description"
          placeholder="What I do?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Choose hero element
        </label>
        <select
          required
          className="form-select "
          id="element"
          name="element"
          value={formData.element}
          onChange={onValueChange}
        >
          <option>I`ve element</option>
          {renderFilters(filters)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default HeroesAddForm;
