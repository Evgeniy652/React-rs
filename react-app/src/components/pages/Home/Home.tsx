/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityStatus_E } from 'common/enums/entity-status.enum';
import { Gender_E } from 'common/enums/gender.enum';
import { Species_E } from 'common/enums/species.enum';
import { ApiData_I, ApiInfo_I, ApiResult_I } from 'common/interfaces/api.interface';
import { HomeForm_I } from 'common/interfaces/home-form.interface';
import CardDetails from 'components/CardDetails/CardDetails';
import Cards from 'components/Cards/Cards';
import Modal from 'components/Modal/Modal';
import Spinner from 'components/Spinner/Spinner';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Home.css';

export interface HomeState {
  currentPage: number;
  cards: ApiResult_I[];
  info: ApiInfo_I;
  showModal: boolean;
  selectedCard: ApiResult_I;
  dataIsLoading: boolean;
  showErrorMessage: boolean;
}

const Home = () => {
  const apiDomain = 'https://rickandmortyapi.com/api';

  const init = async (): Promise<void> => {
    setState((state) => ({
      ...state,
      dataIsLoading: true,
    }));

    const data = await getData(formControls, 1);

    setState((state) => {
      const newState: HomeState = {
        ...state,
        cards: data.results,
        info: data.info,
        currentPage: 1,
        dataIsLoading: false,
      };

      return newState;
    });
  };

  const [state, setState] = useState({
    cards: [],
    info: {
      count: null,
      next: null,
      pages: null,
      prev: null,
    },
    currentPage: 0,
    showModal: false,
    selectedCard: null,
    dataIsLoading: false,
    showErrorMessage: false,
  });

  const [formControls, setFormControls] = useState<HomeForm_I>({
    searchValue: window.localStorage.getItem('value') ?? '',
    status: EntityStatus_E.ALL,
    gender: Gender_E.NONE,
    species: Species_E.ALL,
  });

  useEffect(() => {
    console.log('use effect for Home -> mount and formControls changes');
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formControls.gender, formControls.species, formControls.status]);

  useEffect(() => {
    console.log('Search has changed');

    return () => {
      window.localStorage.setItem('value', formControls.searchValue);
    };
  }, [formControls.searchValue]);

  const getData = async (formControls: HomeForm_I, pageNumber?: number): Promise<ApiData_I> => {
    const url = new URL(`${apiDomain}/character`);

    if (formControls.searchValue) {
      url.searchParams.append('name', formControls.searchValue);
    }

    if (formControls.status && formControls.status !== EntityStatus_E.ALL) {
      url.searchParams.append('status', formControls.status);
    }

    if (formControls.gender && formControls.gender !== Gender_E.NONE) {
      url.searchParams.append('gender', formControls.gender);
    }

    if (formControls.species && formControls.species !== Species_E.ALL) {
      url.searchParams.append('species', formControls.species);
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

    const data = await getData(formControls, 1);

    setState((state) => {
      const newState: HomeState = {
        ...state,
        currentPage: 1,
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
    let currentPage: number = state.currentPage;

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

    const data = await getData(formControls, currentPage);

    setState((state) => {
      const newState: HomeState = {
        ...state,
        currentPage,
        cards: data.results,
        info: data.info,
        dataIsLoading: false,
      };

      return newState;
    });
  };

  const openModal = (card: ApiResult_I) => {
    if (state.showModal) {
      return;
    }

    setState((state) => {
      const newState: HomeState = { ...state, showModal: true, selectedCard: card };

      return newState;
    });
  };

  const handleGlobalClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (!state.showModal) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('.card-details') && target.className !== 'cross') {
      return;
    }

    setState((state) => {
      const newState: HomeState = { ...state, showModal: false, selectedCard: null };

      return newState;
    });
  };

  const renderModal = (): React.ReactNode => {
    if (!state.showModal) {
      return;
    }

    return (
      <Modal>
        <CardDetails element={state.selectedCard}></CardDetails>
      </Modal>
    );
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
    if (!state.cards.length) {
      return;
    }

    return (
      <>
        <div className="paginator" onClick={onNumberPageClick}>
          <div className="left">👈</div>
          <div>
            {state.currentPage} of {state.info.pages}
          </div>
          <div className="right">👉</div>
        </div>
        <form action="">
          <div className="control">
            <label htmlFor="status">Choose a page 👇:</label>
            <select
              onChange={currentPageOnChange}
              value={state.currentPage}
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
    setFormControls((state) => {
      return { ...state, searchValue: $event.target.value };
    });
  };

  const statusOnChange = ($event: any) => {
    setFormControls((state) => {
      return { ...state, status: $event.target.value };
    });
  };

  const speciesOnChange = ($event: any) => {
    setFormControls((state) => {
      return { ...state, species: $event.target.value };
    });
  };

  const currentPageOnChange = async ($event: any) => {
    setState((state) => {
      return { ...state, dataIsLoading: true };
    });

    const data = await getData(formControls, $event.target.value);

    setState((state) => {
      const newState: HomeState = {
        ...state,
        currentPage: $event.target.value,
        cards: data.results,
        info: data.info,
        dataIsLoading: false,
      };

      return newState;
    });
  };

  const genderOnChange = ($event: any) => {
    console.log($event);

    setFormControls((state) => {
      const gender = $event.target.value;

      return { ...state, gender };
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
              value={formControls.searchValue}
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
                value={formControls.status}
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
                value={formControls.species}
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
                  checked={formControls.gender === Gender_E.NONE}
                  value={Gender_E.NONE}
                  name="gender"
                  type="radio"
                />
                None
              </label>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={formControls.gender === Gender_E.MALE}
                  value={Gender_E.MALE}
                  name="gender"
                  type="radio"
                />
                Male
              </label>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={formControls.gender === Gender_E.FEMALE}
                  value={Gender_E.FEMALE}
                  name="gender"
                  type="radio"
                />
                Female
              </label>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={formControls.gender === Gender_E.GENDERLESS}
                  value={Gender_E.GENDERLESS}
                  name="gender"
                  type="radio"
                />
                Genderless
              </label>
              <label>
                <input
                  onChange={genderOnChange}
                  checked={formControls.gender === Gender_E.UNKNOWN}
                  value={Gender_E.UNKNOWN}
                  name="gender"
                  type="radio"
                />
                Unknown
              </label>
            </fieldset>
          </form>
        </div>
        <Cards dataArr={state.cards} onCardClick={(card) => openModal(card)} />
        {renderPaginator()}
      </div>
    );
  };

  return (
    <div onClick={handleGlobalClick} className="content">
      {renderContent()}
      {renderModal()}
      {/* INFO: Сообщение если что-то пошло не так при загрузке данных */}
      {state.showErrorMessage && (
        <div className="error-message">🥶 ...Something goes wrong with loading data... 🥶 </div>
      )}
    </div>
  );
};

export default Home;
