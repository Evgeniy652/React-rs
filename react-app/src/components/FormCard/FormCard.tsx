import { FormCard_I } from 'common/interfaces/own-card.interface';
import React from 'react';
import './FormCard.css';

export interface FormCardProps {
  element: FormCard_I;
  role: string;
}

class FormCard extends React.Component<FormCardProps> {
  constructor(props: FormCardProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { element: el, role } = this.props;

    return (
      <div role={role} className="card" key={el.id}>
        <div className="card-img">
          <img src={el.file && URL.createObjectURL(el.file)} alt="photo" />
        </div>
        <p className="card-name">
          Name: <strong>{el.name}</strong>
        </p>
        <p className="card-status">
          Status: <strong>{el.status}</strong>
        </p>
        <p className="card-species">
          Species: <strong>{el.species.join(' ')}</strong>
        </p>
        <p className="card-gender">
          Gender: <strong>{el.gender}</strong>
        </p>
        <p className="card-created">
          Created: <strong>{el.createdDate}</strong>
        </p>
      </div>
    );
  }
}

export default FormCard;
