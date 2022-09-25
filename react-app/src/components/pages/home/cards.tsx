import React from 'react';
import './cards.css';
import data from './data.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Cards extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { data };
  }

  createCards() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arrCards = this.state.data.results.map((el: any) => {
      return (
        <div className="card" key={el.id}>
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

  render(): React.ReactNode {
    const res = this.createCards();
    return <div className="cards">{res}</div>;
  }
}

export default Cards;
