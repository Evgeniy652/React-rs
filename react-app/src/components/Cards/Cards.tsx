import { ApiResult_I } from 'common/interfaces/api.interface';
import Card from '../Card/Card';
import React from 'react';
import './Cards.css';

import data from '../../assets/data.json';

export interface CardsProps {
  value: string;
}

export interface CardsState {
  dataArr: ApiResult_I[];
}

class Cards extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);

    this.state = { dataArr: this.sortingData() };
  }

  private sortingData(): ApiResult_I[] {
    return data.results.filter((card: ApiResult_I) => {
      return card.name.toLowerCase().includes(this.props.value.toLowerCase());
    });
  }

  private createCards(data: ApiResult_I[]): JSX.Element[] {
    return data.map((el: ApiResult_I) => {
      return <Card key={el.id} role="card" element={el} />;
    });
  }

  render(): React.ReactNode {
    const jsxCards = this.createCards(this.sortingData());

    if (!jsxCards.length) {
      return <p className="text-none">No matches were found for your search</p>;
    }

    return <div className="cards">{jsxCards}</div>;
  }
}
export default Cards;
