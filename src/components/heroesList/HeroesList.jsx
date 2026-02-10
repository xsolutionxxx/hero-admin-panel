import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  /* heroesFetching,
  heroesFetched,
  heroesFetchingError, */
  fetchHeroes,
  heroDeleted,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  /* const someState = useSelector((state) => ({
    heroes: state.heroes.heroes,
    activeFilter: state.filters.activeFilter,
  })); - кожен раз створює новий обєкт, викликає перерендер через порівнювання силок обєктів*/

  const filteredHeroesSlector = createSelector(
    (state) => state.heroes.heroes,
    (state) => state.filters.activeFilter,
    (heroes, filter) => {
      if (filter === "all") {
        return heroes;
      } else {
        return heroes.filter((hero) => hero.element === filter);
      }
    },
  );

  /* const filteredHeroes = useSelector((state) => {
    if (state.filters.activeFilter === "all") {
      return state.heroes.heroes;
    } else {
      return state.heroes.heroes.filter(
        (hero) => hero.element === state.filters.activeFilter,
      );
    }
  }); */

  const filteredHeroes = useSelector(filteredHeroesSlector);

  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus,
  );
  /* const { heroes, heroesLoadingStatus, activeFilter } = useSelector(
    (state) => state,
  ); */

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    /* dispatch("HEROES_FETCHING");
    request("http://localhost:3002/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError())); */

    dispatch(fetchHeroes(request));

    // eslint-disable-next-line
  }, []);

  const onDeleteHero = useCallback(
    (id) => {
      request(`http://localhost:3002/heroes/${id}`, "DELETE")
        .then(() => {
          dispatch(heroDeleted(id));
        })
        .catch((err) => console.log(err));
    },

    [request, dispatch],
  );

  /* const filteredHeroes = heroes.filter((item) => {
    if (activeFilter === "all") return true;
    return item.element === activeFilter;
  }); */

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
          {...props}
          onDeleteHero={() => onDeleteHero(id)}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
