/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalStateContext } from 'App';
import { EntityStatus_E } from 'common/enums/entity-status.enum';
import { Gender_E } from 'common/enums/gender.enum';
import { Species_E } from 'common/enums/species.enum';
import { ApiData_I, ApiInfo_I, ApiResult_I } from 'common/interfaces/api.interface';
import { Actions_E } from 'common/enums/actions.enum';
import { GlobalStateContext_I, GlobalState_I } from 'common/interfaces/global-state.interface';
import Cards from 'components/Cards/Cards';
import Spinner from 'components/Spinner/Spinner';
import './Home.css';

export interface HomeState {
  cards: ApiResult_I[];
  showModal: boolean;
  dataIsLoading: boolean;
  showErrorMessage: boolean;
  info: ApiInfo_I;
}

const Home = () => {
  const apiDomain = 'https://rickandmortyapi.com/api';
  const navigate = useNavigate();

  const rerenderData = async (shouldBeFirst?: boolean): Promise<void> => {
    setState((state) => ({
      ...state,
      dataIsLoading: true,
    }));

    const page = shouldBeFirst ? 1 : globalState.currentPage;

    const data = await getData(searchValue, globalState, page);

    dispatch({ type: Actions_E.CHANGE_CURRENT_PAGE_VALUE, value: page });

    setState((state) => {
      const newState: HomeState = {
        ...state,
        cards: data.results,
        info: data.info,
        dataIsLoading: false,
      };

      return newState;
    });
  };

  const [searchValue, setSearchValue] = useState(
    !!window.localStorage.getItem('value') ? window.localStorage.getItem('value') : ''
  );

  const [state, setState] = useState({
    cards: null,
    info: {
      count: null,
      next: null,
      pages: null,
      prev: null,
    },
    showModal: false,
    dataIsLoading: false,
    showErrorMessage: false,
  });

  const { globalState, dispatch } = useContext<GlobalStateContext_I>(GlobalStateContext);

  useEffect(() => {
    console.log('use effect for Home -> mount and formControls changes');
    if (state.cards === null) {
      rerenderData();
    } else {
      rerenderData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.gender, globalState.species, globalState.status]);

  useEffect(() => {
    console.log('Search has changed');

    return () => {
      window.localStorage.setItem('value', searchValue);
    };
  }, [searchValue]);

  const getData = async (
    searchValue: string,
    globalState: GlobalState_I,
    pageNumber?: number
  ): Promise<ApiData_I> => {
    const url = new URL(`${apiDomain}/character`);

    if (searchValue) {
      url.searchParams.append('name', searchValue);
    }

    if (globalState.status && globalState.status !== EntityStatus_E.ALL) {
      url.searchParams.append('status', globalState.status);
    }

    if (globalState.gender && globalState.gender !== Gender_E.NONE) {
      url.searchParams.append('gender', globalState.gender);
    }

    if (globalState.species && globalState.species !== Species_E.ALL) {
      url.searchParams.append('species', globalState.species);
    }

    if (pageNumber) {
      url.searchParams.append('page', String(pageNumber));
    }

    try {
      const response = await fetch(url, { method: 'GET' });

      if (response.status === 404) {
        return {
          info: state.info,
          results: [],
        };
      }

      const apiData = await response.json();
      return apiData;
    } catch (err) {
      setState((state) => ({ ...state, showErrorMessage: true }));
      setTimeout(() => setState((state) => ({ ...state, showErrorMessage: false })), 3000);
      throw new Error('Could not get data from API');
    }
  };

  /**
   * INFO: получаем данные из API при submit
   */
  const submitForm = async (event: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setState((state) => ({
      ...state,
      dataIsLoading: true,
    }));

    const data = await getData(searchValue, globalState, 1);
    dispatch({ type: Actions_E.CHANGE_CURRENT_PAGE_VALUE, value: 1 });

    setState((state) => {
      const newState: HomeState = {
        ...state,
        cards: data.results,
        info: data.info,
        dataIsLoading: false,
      };

      return newState;
    });
  };

  const onNumberPageClick = async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
    const target = event.target as HTMLDivElement;
    event.preventDefault();

    if (target.className.includes('paginator')) {
      return;
    }

    const navigationText = target.textContent;
    let currentPage: number = globalState.currentPage;

    if (
      (navigationText === '👈' && currentPage === 1) ||
      (navigationText === '👉' && currentPage >= state.info.pages)
    ) {
      return;
    }

    if (navigationText === '👈') {
      currentPage -= 1;
    }

    if (navigationText === '👉') {
      currentPage += 1;
    }

    setState((state) => ({
      ...state,
      dataIsLoading: true,
    }));

    const data = await getData(searchValue, globalState, currentPage);

    dispatch({ type: Actions_E.CHANGE_CURRENT_PAGE_VALUE, value: currentPage });
    setState((state) => {
      const newState: HomeState = {
        ...state,
        cards: data.results,
        info: data.info,
        dataIsLoading: false,
      };

      return newState;
    });
  };

  const navigateToCharacter = (card: ApiResult_I) => {
    dispatch({ type: Actions_E.SELECT_CHARACTER, value: card });

    navigate(`./${card.id}`);
  };

  const handleGlobalClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (!state.showModal) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('.card-details') && target.className !== 'cross') {
      return;
    }
  };

  const renderOptionsForPaginator = () => {
    const emptyArray = [...Array(state.info.pages).keys()];

    return emptyArray.map((i) => {
      const page = i + 1;

      return (
        <option key={page} value={page}>
          {page}
        </option>
      );
    });
  };

  const renderPaginator = (): React.ReactNode => {
    if (!state.cards || !state.cards.length) {
      return;
    }

    return (
      <>
        <div className="paginator" onClick={onNumberPageClick}>
          <div className="left">👈</div>
          <div>
            {globalState.currentPage} of {state.info.pages}
          </div>
          <div className="right">👉</div>
        </div>
        <form className="select-page-form">
          <div className="control">
            <label htmlFor="status">Choose a page 👇:</label>
            <select
              onChange={currentPageOnChange}
              value={globalState.currentPage}
              name="species"
              id="species"
            >
              {renderOptionsForPaginator()}
            </select>
          </div>
        </form>
      </>
    );
  };

  const searchValueOnChange = ($event: any) => {
    setSearchValue($event.target.value);
  };

  const statusOnChange = ($event: any) => {
    dispatch({
      type: Actions_E.CHANGE_STATUS_VALUE,
      value: $event.target.value,
    });
  };

  const speciesOnChange = ($event: any) => {
    dispatch({
      type: Actions_E.CHANGE_SPECIES_VALUE,
      value: $event.target.value,
    });
  };

  const genderOnChange = ($event: any) => {
    dispatch({
      type: Actions_E.CHANGE_GENDER_VALUE,
      value: $event.target.value,
    });
  };

  const currentPageOnChange = async ($event: any) => {
    setState((state) => {
      return { ...state, dataIsLoading: true };
    });

    const data = await getData(searchValue, globalState, $event.target.value);

    dispatch({
      type: Actions_E.CHANGE_CURRENT_PAGE_VALUE,
      value: $event.target.value,
    });

    setState((state) => {
      const newState: HomeState = {
        ...state,
        cards: data.results,
        info: data.info,
        dataIsLoading: false,
      };

      return newState;
    });
  };

  const renderContent = (): React.ReactNode => {
    // INFO: управление спинером
    if (state.dataIsLoading) {
      return <Spinner />;
    }

    return (
      <div className="cards-block">
        <div className="search-block">
          <form onSubmit={submitForm}>
            <input
              role="input"
              type="search"
              id="input__search"
              name="search"
              autoComplete="off"
              value={searchValue}
              placeholder="Search by name"
              onChange={searchValueOnChange}
            />

            <button type="submit">Search</button>
          </form>

          <form className="sorting">
            <div className="control">
              <label htmlFor="status">Choose a status:</label>
              <select
                onChange={statusOnChange}
                value={globalState.status}
                name="status"
                id="status"
              >
                <option value={EntityStatus_E.ALL}>All</option>
                <option value={EntityStatus_E.UNKNOWN}>Unknown</option>
                <option value={EntityStatus_E.ALIVE}>Alive</option>
                <option value={EntityStatus_E.DEAD}>Dead</option>
              </select>
            </div>

            <div className="control">
              <label htmlFor="status">Choose a status:</label>
              <select
                onChange={speciesOnChange}
                value={globalState.species}
                name="species"
                id="species"
              >
                <option value={Species_E.ALL}>All</option>
                <option value={Species_E.HUMAN}>Human</option>
                <option value={Species_E.ALIEN}>Alien</option>
                <option value={Species_E.HUMANOID}>Humanoid</option>
                <option value={Species_E.ROBOT}>Robot</option>
                <option value={Species_E.MC}>Mythological Creature</option>
                <option value={Species_E.UNKNOWN}>Unknown</option>
              </select>
            </div>

            <fieldset className="control">
              <span>Gender: </span>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={globalState.gender === Gender_E.NONE}
                  value={Gender_E.NONE}
                  name="gender"
                  type="radio"
                />
                None
              </label>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={globalState.gender === Gender_E.MALE}
                  value={Gender_E.MALE}
                  name="gender"
                  type="radio"
                />
                Male
              </label>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={globalState.gender === Gender_E.FEMALE}
                  value={Gender_E.FEMALE}
                  name="gender"
                  type="radio"
                />
                Female
              </label>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={globalState.gender === Gender_E.GENDERLESS}
                  value={Gender_E.GENDERLESS}
                  name="gender"
                  type="radio"
                />
                Genderless
              </label>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={globalState.gender === Gender_E.UNKNOWN}
                  value={Gender_E.UNKNOWN}
                  name="gender"
                  type="radio"
                />
                Unknown
              </label>
            </fieldset>
          </form>
        </div>
        <Cards dataArr={state.cards} onCardClick={navigateToCharacter} />
        {renderPaginator()}
      </div>
    );
  };

  return (
    <div onClick={handleGlobalClick} className="content">
      {renderContent()}
      {/* INFO: Сообщение если что-то пошло не так при загрузке данных */}
      {state.showErrorMessage && (
        <div className="error-message">🥶 ...Something goes wrong with loading data... 🥶 </div>
      )}
    </div>
  );
};

export default Home;
