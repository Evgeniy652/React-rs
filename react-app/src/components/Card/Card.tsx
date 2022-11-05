import { ApiResult_I } from "common/interfaces/api.interface";
import React from "react";
import "./Card.css";

export interface CardProps {
  element: ApiResult_I;
  role?: string;
}

class Card extends React.Component<CardProps> {
  constructor(props: CardProps) {
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
      </div>
    );
  }
}

export default Card;
