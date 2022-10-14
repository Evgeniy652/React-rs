import { ApiResult_I } from 'common/interfaces/api.interface';
import Card from '../Card/Card';
import React from 'react';
import './Cards.css';

export interface CardsProps {
  dataArr: ApiResult_I[];
}

class Cards extends React.Component<CardsProps> {
  constructor(props: CardsProps) {
    super(props);
  }

  private createCards(): JSX.Element[] {
    return this.props.dataArr.map((el: ApiResult_I) => {
      return <Card key={el.id} role="card" element={el} />;
    });
  }

  render(): React.ReactNode {
    const jsxCards = this.createCards();

    if (!jsxCards.length) {
      return <p className="text-none">No matches were found for your search</p>;
    }

    return <div className="cards">{jsxCards}</div>;
  }
}
export default Cards;
