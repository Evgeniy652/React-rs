import React from 'react';
import './cards.css';
import data from './data.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Cards extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataStandart: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    const dataArr = data.results;
    this.state = { dataArr };
    this.dataStandart = data.results;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sortingCards(): any[] {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const filterCards = this.dataStandart.filter((card: any) => {
      return card.name.toLowerCase().includes(this.props.value.toLowerCase());
    });
    return filterCards;
  }

  createCards() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arrCards = this.state.dataArr.map((el: any) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidUpdate(prevProps: Readonly<any>): void {
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
