/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiData_I, ApiInfo_I, ApiResult_I } from 'common/interfaces/api.interface';
import CardDetails from 'components/CardDetails/CardDetails';
import Cards from 'components/Cards/Cards';
import Modal from 'components/Modal/Modal';
import React from 'react';
import './Home.css';

export interface HomeState {
  value: string;
  currentPage: number;
  cards: ApiResult_I[];
  info: ApiInfo_I;
  showModal: boolean;
  selectedCard: ApiResult_I;
}

class Home extends React.Component<Record<string, never>, HomeState> {
  private apiDomain = 'https://rickandmortyapi.com/api';

  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      cards: [],
      info: {
        count: null,
        next: null,
        pages: null,
        prev: null,
      },
      value: window.localStorage.getItem('value') ?? '',
      currentPage: 0,
      showModal: false,
      selectedCard: null,
    };
  }

  private async getData(searchValue?: string, pageNumber?: number): Promise<ApiData_I> {
    const url = new URL(`${this.apiDomain}/character`);

    if (searchValue) {
      url.searchParams.append('name', searchValue);
    }

    if (pageNumber) {
      url.searchParams.append('page', String(pageNumber));
    }

    console.log(url);

    try {
      const response = await fetch(url, { method: 'GET' });

      if (response.status === 404) {
        return {
          info: this.state.info,
          results: [],
        };
      }

      const apiData = await response.json();
      return apiData;
    } catch (err) {
      throw new Error('Could not get data from API');
    }
  }

  /**
   * INFO: получаем данные из API при submit
   */
  async submitForm(event: React.ChangeEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const data = await this.getData(this.state.value, 1);

    this.setState((state) => {
      const newState: HomeState = {
        ...state,
        currentPage: 1,
        cards: data.results,
        info: data.info,
      };

      return newState;
    });
  }

  async onNumberPageClick(event: React.MouseEvent<HTMLDivElement>): Promise<void> {
    const target = event.target as HTMLDivElement;
    event.preventDefault();

    if (target.className.includes('paginator')) {
      return;
    }

    const navigationText = target.textContent;
    let currentPage: number = this.state.currentPage;

    if (
      (navigationText === '👈' && currentPage === 1) ||
      (navigationText === '👉' && currentPage >= this.state.info.pages)
    ) {
      return;
    }

    if (navigationText === '👈') {
      currentPage -= 1;
    }

    if (navigationText === '👉') {
      currentPage += 1;
    }

    const data = await this.getData(this.state.value, currentPage);

    this.setState((state) => {
      const newState: HomeState = { ...state, currentPage, cards: data.results, info: data.info };

      return newState;
    });
  }

  async componentDidMount(): Promise<void> {
    const data = await this.getData(this.state.value, 1);

    this.setState((state) => {
      const newState: HomeState = {
        ...state,
        cards: data.results,
        info: data.info,
        currentPage: 1,
      };

      return newState;
    });
  }

  componentWillUnmount(): void {
    window.localStorage.setItem('value', this.state.value);
  }

  openModal(card: ApiResult_I) {
    if (this.state.showModal) {
      return;
    }

    this.setState((state) => {
      const newState: HomeState = { ...state, showModal: true, selectedCard: card };

      return newState;
    });
  }

  handleGlobalClick(event: React.MouseEvent<HTMLElement>): void {
    if (!this.state.showModal) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('.card-details') && target.className !== 'cross') {
      return;
    }

    this.setState((state) => {
      const newState: HomeState = { ...state, showModal: false, selectedCard: null };

      return newState;
    });
  }

  renderPaginator(): React.ReactNode {
    if (!this.state.cards.length) {
      return;
    }

    return (
      <div className="paginator" onClick={this.onNumberPageClick.bind(this)}>
        <div className="left">👈</div>
        <div>
          {this.state.currentPage} of {this.state.info.pages}
        </div>
        <div className="right">👉</div>
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <div onClick={this.handleGlobalClick.bind(this)} className="content">
        <div className="search-block">
          <form onSubmit={this.submitForm.bind(this)}>
            <input
              role="input"
              type="search"
              id="input__search"
              name="search"
              autoComplete="off"
              value={this.state.value}
              placeholder="Search by name"
              onChange={(event) => this.setState({ value: event.target.value })}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="cards-block">
          <Cards dataArr={this.state.cards} onCardClick={(card) => this.openModal(card)} />
          {this.renderPaginator()}
        </div>
        {this.state.showModal && (
          <Modal>
            <CardDetails element={this.state.selectedCard}></CardDetails>
          </Modal>
        )}
      </div>
    );
  }
}

export default Home;
