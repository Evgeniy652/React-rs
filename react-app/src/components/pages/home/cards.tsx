import React from 'react';
import './cards.css';
import data from './data.json';

class Cards extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { data };
  }

  createCards() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arrCards = this.state.results.map((el: any) => {
      <div className="card" key={el.id}>
        <div className="card-img">
          <img src="{el.image}" alt="photo" />
        </div>
      </div>;
    });
    return arrCards;
  }

  render(): React.ReactNode {
    return <div className="cards">{arrCards}</div>;
  }
}

export default Cards;
