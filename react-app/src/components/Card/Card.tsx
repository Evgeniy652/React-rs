import { ApiResult_I } from 'common/interfaces/api.interface';
import React from 'react';
import './Card.css';

export interface OwnCardProps {
  element: ApiResult_I;
  role?: string;
}

class Card extends React.Component<OwnCardProps> {
  constructor(props: OwnCardProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { element: el, role } = this.props;

    return (
      <div role={role} className="card" key={el.id}>
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
        <p className="card-created">
          Created: <strong>{el.created}</strong>
        </p>
      </div>
    );
  }
}

export default Card;
