import { ApiResult_I } from 'common/interfaces/api.interface';
import React from 'react';
import './cards.css';
import data from './data.json';

export interface CardsProps {
  value: string;
}

export interface CardsState {
  dataArr: ApiResult_I[];
}

class Cards extends React.Component<CardsProps, CardsState> {
  dataStandard: ApiResult_I[];
  constructor(props: CardsProps) {
    super(props);
    const dataArr = data.results;
    this.state = { dataArr };
    this.dataStandard = data.results;
  }

  sortingCards(): ApiResult_I[] {
    const filterCards = this.dataStandard.filter((card: ApiResult_I) => {
      return card.name.toLowerCase().includes(this.props.value.toLowerCase());
    });
    return filterCards;
  }

  createCards(): JSX.Element[] {
    const arrCards = this.state.dataArr.map((el: ApiResult_I) => {
      return (
        <div role="card" className="card" key={el.id}>
          <div className="card-img">
            <img src={el.image} alt="photo" />
          </div>
          <p className="card-name">
            Name: <strong>{el.name}</strong>
          </p>
          <p className="card-status">
            Status: <strong>{el.status}</strong>
          </p>
          <p className="card-species">
            Species: <strong>{el.species}</strong>
          </p>
          <p className="card-gender">
            Gender: <strong>{el.gender}</strong>
          </p>
        </div>
      );
    });

    return arrCards;
  }

  componentDidUpdate(prevProps: { value: string }): void {
    if (this.props.value != prevProps.value) {
      const dataArr = this.sortingCards();
      this.setState({ dataArr });
      return;
    }
  }

  render(): React.ReactNode {
    const res = this.createCards();
    const content =
      res.length > 0 ? res : <p className="text-none">No matches were found for your search</p>;
    return <div className="cards">{content}</div>;
  }
}
export default Cards;
