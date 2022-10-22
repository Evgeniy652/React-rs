/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiData_I, ApiInfo_I, ApiResult_I } from 'common/interfaces/api.interface';
import CardDetails from 'components/CardDetails/CardDetails';
import Cards from 'components/Cards/Cards';
import Modal from 'components/Modal/Modal';
import Spinner from 'components/Spinner/Spinner';
import React, { useEffect, useState } from 'react';
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

    const data = await getData(value, 1);

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

  const [value, setValue] = useState(window.localStorage.getItem('value') ?? '');

  useEffect(() => {
    console.log('use effect for Home -> mount');
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      window.localStorage.setItem('value', value);
    };
  }, [value]);

  const getData = async (searchValue?: string, pageNumber?: number): Promise<ApiData_I> => {
    const url = new URL(`${apiDomain}/character`);

    if (searchValue) {
      url.searchParams.append('name', searchValue);
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

    const data = await getData(value, 1);

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

    const data = await getData(value, currentPage);

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

  const renderPaginator = (): React.ReactNode => {
    if (!state.cards.length) {
      return;
    }

    return (
      <div className="paginator" onClick={onNumberPageClick}>
        <div className="left">👈</div>
        <div>
          {state.currentPage} of {state.info.pages}
        </div>
        <div className="right">👉</div>
      </div>
    );
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
              value={value}
              placeholder="Search by name"
              onChange={(event) => setValue(event.target.value)}
            />
            <button type="submit">Search</button>
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
