import { ApiResult_I } from "common/interfaces/api.interface";
import React from "react";
import "./CardDetails.css";

export interface CardDetailsProps {
  element: ApiResult_I;
  role?: string;
}

class CardDetails extends React.Component<CardDetailsProps> {
  constructor(props: CardDetailsProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { element: el, role } = this.props;

    return (
      <div>
        <div role={role} className="card-details" key={el.id}>
          <div className="cross">❌</div>
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
      </div>
    );
  }
}

export default CardDetails;
