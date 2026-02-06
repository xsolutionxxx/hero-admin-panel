import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, activeFilter } = useSelector(
    (state) => state,
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3002/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDeleteHero = (id) => {
    request(`http://localhost:3002/heroes/${id}`, "DELETE")
      .then(() => {
        dispatch(heroDeleted(id));
      })
      .catch((err) => console.log(err));
  };

  const filteredHeroes = heroes.filter((item) => {
    if (activeFilter === "all") return true;
    return item.element === activeFilter;
  });

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Download error</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">No heroes yet</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          key={id}
          id={id}
          {...props}
          onDeleteHero={onDeleteHero}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
